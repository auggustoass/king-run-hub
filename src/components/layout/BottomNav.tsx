import { Home, Calendar, Trophy, Target, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Início' },
  { path: '/eventos', icon: Calendar, label: 'Eventos' },
  { path: '/ranking', icon: Trophy, label: 'Ranking' },
  { path: '/desafios', icon: Target, label: 'Desafios' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                "hover:text-accent",
                isActive ? "text-accent" : "text-muted-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1 transition-transform",
                  isActive && "scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
