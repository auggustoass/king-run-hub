import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents, formatDate } from '@/lib/mockData';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';

export default function Events() {
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const navigate = useNavigate();

  const filteredEvents = mockEvents.filter(event => {
    if (filter === 'open') return event.registrationOpen;
    if (filter === 'closed') return !event.registrationOpen;
    return true;
  });

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <p className="text-muted-foreground">Encontre sua próxima corrida</p>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="open">Abertos</TabsTrigger>
            <TabsTrigger value="closed">Em breve</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate(`/eventos/${event.id}`)}
            >
              {/* Event Image */}
              <div className="relative h-32">
                <img 
                  src={event.imageUrl} 
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge 
                    className={event.registrationOpen 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                    }
                  >
                    {event.registrationOpen ? 'Inscrições abertas' : 'Em breve'}
                  </Badge>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-4 space-y-3">
                <h2 className="font-bold text-lg">{event.name}</h2>
                
                <div className="flex flex-wrap gap-2">
                  {event.distances.map(distance => (
                    <Badge key={distance} variant="outline" className="font-medium">
                      {distance}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{event.participantsCount}/{event.maxParticipants}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{event.location}</span>
                </div>

                <Button 
                  className="w-full"
                  variant={event.registrationOpen ? 'default' : 'secondary'}
                >
                  {event.registrationOpen ? 'Ver detalhes' : 'Saiba mais'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum evento encontrado</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
