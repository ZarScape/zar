import React, { useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'theme';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 210, spread: 200 },
  purple: { base: 270, spread: 200 },
  green: { base: 140, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 35, spread: 200 },
  theme: { base: 174, spread: 0 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'theme',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const { clientX: x, clientY: y } = e;
    const { left, top } = cardRef.current.getBoundingClientRect();
    
    cardRef.current.style.setProperty('--x', x.toFixed(2));
    cardRef.current.style.setProperty('--xp', ((x - left) / cardRef.current.offsetWidth).toFixed(2));
    cardRef.current.style.setProperty('--y', y.toFixed(2));
    cardRef.current.style.setProperty('--yp', ((y - top) / cardRef.current.offsetHeight).toFixed(2));
    cardRef.current.style.setProperty('--left', left.toFixed(2));
    cardRef.current.style.setProperty('--top', top.toFixed(2));
  };

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) {
      return '';
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: any = {
      '--base': base,
      '--spread': spread,
      '--radius': '32',
      '--border': '1',
      '--backdrop': 'rgba(15, 15, 15, 0.45)',
      '--backup-border': 'rgba(255, 255, 255, 0.08)',
      '--size': '300',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      '--saturation': '100',
      '--lightness': '60',
      '--bg-spot-opacity': '0',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc((var(--x, 0) - var(--left, 0)) * 1px)
        calc((var(--y, 0) - var(--top, 0)) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0)), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      touchAction: 'none' as const,
      transition: 'all 0.3s ease',
    };

  if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    [data-glow]:hover::before,
    [data-glow]:hover::after {
      opacity: 1;
    }

    [data-glow]:hover {
      --bg-spot-opacity: 0.1;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc((var(--x, 0) - var(--left, 0)) * 1px)
        calc((var(--y, 0) - var(--top, 0)) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc((var(--x, 0) - var(--left, 0)) * 1px)
        calc((var(--y, 0) - var(--top, 0)) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: 0;
      transition: opacity 0.5s ease;
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
      z-index: -1;
    }

    [data-glow]:hover [data-glow] {
      opacity: var(--outer, 1);
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        onPointerMove={handlePointerMove}
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          rounded-[2rem]
          relative 
          flex flex-col
          shadow-[0_1rem_2rem_-1rem_black] 
          p-6 
          gap-4 
          backdrop-blur-[16px]
          transition-all duration-300
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
};

export { GlowCard }
