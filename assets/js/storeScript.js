lucide.createIcons();
document.addEventListener('contextmenu', (event) => event.preventDefault());

const yearNode = document.getElementById('current-year');
if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

const cursor = document.getElementById('cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
const speed = 0.15;
let lastAngle = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animateCursor() {
    if (!cursor) {
        return;
    }

    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;

    cursorX += distX * speed;
    cursorY += distY * speed;

    let angle = lastAngle;
    if (Math.abs(distX) > 0.5 || Math.abs(distY) > 0.5) {
        angle = Math.atan2(distY, distX) * (180 / Math.PI) + 90;
        lastAngle = angle;
    }

    cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0) rotate(${angle}deg)`;
    requestAnimationFrame(animateCursor);
}

requestAnimationFrame(animateCursor);

const cards = Array.from(document.querySelectorAll('.package-card'));
const disabledButtons = Array.from(document.querySelectorAll('.disabled-payment'));
const paymentWarning = document.getElementById('payment-warning');
const paymentWarningClose = document.getElementById('payment-warning-close');
const verifyModal = document.getElementById('human-check');
const holdVerifyBtn = document.getElementById('hold-verify-btn');
const holdProgress = document.getElementById('hold-progress');
const holdLabel = document.getElementById('hold-label');
const HOLD_DURATION_MS = 1500;
const VERIFY_TTL_MS = 5 * 60 * 1000;
const VERIFY_TS_KEY = 'zar_store_human_verified_at';
let holdStart = 0;
let holdRaf = 0;
let holdActive = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 70}ms`;
    observer.observe(card);

    card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 6;
        const rotateX = (0.5 - py) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
        card.style.transform = '';
    });

    card.addEventListener('click', () => {
        cards.forEach((item) => item.classList.remove('active'));
        card.classList.add('active');
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
});

function openPaymentWarning() {
    if (!paymentWarning) return;
    paymentWarning.classList.remove('hidden');
}

function closePaymentWarning() {
    if (!paymentWarning) return;
    paymentWarning.classList.add('hidden');
}

disabledButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        openPaymentWarning();
    });
});

if (paymentWarningClose) {
    paymentWarningClose.addEventListener('click', closePaymentWarning);
}

if (paymentWarning) {
    paymentWarning.addEventListener('click', (event) => {
        if (event.target === paymentWarning) {
            closePaymentWarning();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePaymentWarning();
    }
});

function openHumanVerify() {
    if (!verifyModal) return;
    document.body.classList.add('verify-locked');
    verifyModal.classList.remove('hidden');
    if (holdProgress) holdProgress.style.width = '0%';
    holdVerifyBtn?.classList.remove('is-success');
    if (holdLabel) holdLabel.textContent = 'Click & Hold to Verify';
}

function closeHumanVerify() {
    if (!verifyModal) return;
    document.body.classList.remove('verify-locked');
    verifyModal.classList.add('hidden');
}

function stopHold() {
    const verifiedAt = Number(sessionStorage.getItem(VERIFY_TS_KEY) || 0);
    const recentlyVerified = sessionStorage.getItem('zar_store_human_verified') === '1' &&
        Number.isFinite(verifiedAt) &&
        (Date.now() - verifiedAt) < 1500;
    if (recentlyVerified) {
        return;
    }

    holdActive = false;
    if (holdRaf) {
        cancelAnimationFrame(holdRaf);
        holdRaf = 0;
    }
    if (holdProgress) holdProgress.style.width = '0%';
    holdVerifyBtn?.classList.remove('is-success');
    if (holdLabel && sessionStorage.getItem('zar_store_human_verified') !== '1') {
        holdLabel.textContent = 'Click & Hold to Verify';
    }
}

function tickHold() {
    if (!holdActive) return;
    const elapsed = performance.now() - holdStart;
    const ratio = Math.min(1, elapsed / HOLD_DURATION_MS);
    if (holdProgress) holdProgress.style.width = `${ratio * 100}%`;

    if (ratio >= 1) {
        holdActive = false;
        sessionStorage.setItem('zar_store_human_verified', '1');
        sessionStorage.setItem(VERIFY_TS_KEY, String(Date.now()));
        holdVerifyBtn?.classList.add('is-success');
        if (holdLabel) holdLabel.textContent = 'Verification Successful';
        setTimeout(closeHumanVerify, 520);
        return;
    }

    holdRaf = requestAnimationFrame(tickHold);
}

function startHold(event) {
    event.preventDefault();
    if (sessionStorage.getItem('zar_store_human_verified') === '1') return;
    holdActive = true;
    holdStart = performance.now();
    if (holdLabel) holdLabel.textContent = 'Keep Holding...';
    holdRaf = requestAnimationFrame(tickHold);
}

if (holdVerifyBtn) {
    holdVerifyBtn.addEventListener('mousedown', startHold);
    holdVerifyBtn.addEventListener('touchstart', startHold, { passive: false });
    holdVerifyBtn.addEventListener('mouseup', stopHold);
    holdVerifyBtn.addEventListener('mouseleave', stopHold);
    holdVerifyBtn.addEventListener('touchend', stopHold);
    holdVerifyBtn.addEventListener('touchcancel', stopHold);
}

const verifiedFlag = sessionStorage.getItem('zar_store_human_verified') === '1';
const verifiedAt = Number(sessionStorage.getItem(VERIFY_TS_KEY) || 0);
const stillValid = verifiedFlag && Number.isFinite(verifiedAt) && (Date.now() - verifiedAt) < VERIFY_TTL_MS;

if (!stillValid) {
    sessionStorage.removeItem('zar_store_human_verified');
    sessionStorage.removeItem(VERIFY_TS_KEY);
    openHumanVerify();
}
