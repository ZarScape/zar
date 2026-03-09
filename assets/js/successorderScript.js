(function () {
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    const targetUrl = "https://discord.gg/6YVmxA4Qsf";
    const countdownNode = document.getElementById("countdown");
    let seconds = 10;

    const timer = setInterval(() => {
        seconds -= 1;

        if (countdownNode) {
            countdownNode.textContent = String(seconds);
        }

        if (seconds <= 0) {
            clearInterval(timer);
            window.location.href = targetUrl;
        }
    }, 1000);
})();
