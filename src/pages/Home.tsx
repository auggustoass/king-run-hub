import { MobileLayout } from '@/components/layout/MobileLayout';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  mockEvents, 
  mockAnnouncements, 
  getTimeUntilEvent, 
  formatDate 
} from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, MapPin, Users, Bell, Megaphone } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const nextEvent = mockEvents.find(e => e.registrationOpen);
  const countdown = nextEvent ? getTimeUntilEvent(nextEvent.date) : null;

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <button className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>

        {/* Welcome */}
        <div className="space-y-1">
          <p className="text-muted-foreground">Olá,</p>
          <h1 className="text-2xl font-bold">{user?.name || 'Atleta'}! 👋</h1>
        </div>

        {/* Next Event Card */}
        {nextEvent && (
          <Card className="overflow-hidden border-0 shadow-lg animate-fade-in">
            <div className="relative h-40">
              <img 
                src={nextEvent.imageUrl} 
                alt={nextEvent.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Badge className="bg-accent text-accent-foreground mb-2">
                  Próximo evento
                </Badge>
                <h2 className="text-xl font-bold text-primary-foreground">
                  {nextEvent.name}
                </h2>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Countdown */}
              {countdown && (
                <div className="flex justify-center gap-4">
                  {[
                    { value: countdown.days, label: 'Dias' },
                    { value: countdown.hours, label: 'Horas' },
                    { value: countdown.minutes, label: 'Min' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center">
                        <span className="text-2xl font-bold">{item.value}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Event Details */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(nextEvent.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{nextEvent.participantsCount} inscritos</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{nextEvent.location}</span>
              </div>

              {/* CTA Button */}
              <Button 
                className="w-full h-14 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold animate-pulse-gold"
                onClick={() => navigate(`/eventos/${nextEvent.id}`)}
              >
                Inscreva-se na corrida
              </Button>
            </div>
          </Card>
        )}

        {/* Announcements */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-accent" />
              Comunicados
            </h2>
            <button className="text-sm text-accent font-medium flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {mockAnnouncements.slice(0, 3).map((announcement, index) => (
              <Card 
                key={announcement.id} 
                className="p-4 flex gap-3 hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {announcement.imageUrl && (
                  <img 
                    src={announcement.imageUrl} 
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={
                      announcement.type === 'event' ? 'default' :
                      announcement.type === 'sponsor' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {announcement.type === 'event' ? 'Evento' :
                       announcement.type === 'sponsor' ? 'Patrocinador' : 'Info'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(announcement.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm truncate">{announcement.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {announcement.content}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        {user && (
          <Card className="p-4 animate-fade-in">
            <h3 className="font-semibold mb-3">Seu resumo</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">{user.totalRaces}</div>
                <div className="text-xs text-muted-foreground">Corridas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{user.totalMedals}</div>
                <div className="text-xs text-muted-foreground">Medalhas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">#{user.averagePosition}</div>
                <div className="text-xs text-muted-foreground">Posição média</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
}
