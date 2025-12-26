import { Crown } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-lg bg-primary flex items-center justify-center`}>
        <Crown className={`${size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-6 h-6' : 'w-5 h-5'} text-accent`} />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${textSizes[size]} font-black tracking-tight text-foreground`}>
            KING
          </span>
          <span className={`${textSizes[size]} font-black tracking-tight text-accent`}>
            RUN
          </span>
        </div>
      )}
    </div>
  );
}
