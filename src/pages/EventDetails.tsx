import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockEvents, formatDate, getTimeUntilEvent } from '@/lib/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <MobileLayout showNav={false}>
        <div className="p-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
          <div className="text-center py-12">
            <p>Evento não encontrado</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  const countdown = getTimeUntilEvent(event.date);

  const handleRegistration = () => {
    if (!selectedDistance) {
      toast({
        title: 'Selecione uma distância',
        description: 'Escolha a distância que deseja correr.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsRegistered(true);
      setShowRegistration(false);
      toast({
        title: 'Inscrição confirmada! 🎉',
        description: `Você está inscrito para ${event.name} - ${selectedDistance}`,
      });
    }, 1000);
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-64">
          <img 
            src={event.imageUrl} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button 
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 -mt-8 relative space-y-6">
          <Card className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge 
                  className={event.registrationOpen 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-secondary'
                  }
                >
                  {event.registrationOpen ? 'Inscrições abertas' : 'Em breve'}
                </Badge>
                <h1 className="text-2xl font-bold mt-2">{event.name}</h1>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex justify-center gap-3 py-4 bg-secondary rounded-lg">
              {[
                { value: countdown.days, label: 'Dias' },
                { value: countdown.hours, label: 'Horas' },
                { value: countdown.minutes, label: 'Min' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-14 h-14 rounded-lg bg-background flex items-center justify-center">
                    <span className="text-xl font-bold">{item.value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Event Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-5 h-5 text-accent" />
                <span>{event.participantsCount} de {event.maxParticipants} vagas preenchidas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-accent" />
                <span>Largada às 7h00</span>
              </div>
            </div>

            {/* Distances */}
            <div>
              <h3 className="font-semibold mb-2">Distâncias disponíveis</h3>
              <div className="flex flex-wrap gap-2">
                {event.distances.map(distance => (
                  <Badge key={distance} variant="outline" className="text-base px-4 py-1">
                    {distance}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Sobre o evento</h3>
            <p className="text-muted-foreground">{event.description}</p>
          </Card>

          {/* Registration Status */}
          {isRegistered && (
            <Card className="p-4 bg-success/10 border-success">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-success" />
                <div>
                  <h3 className="font-semibold text-success">Você está inscrito!</h3>
                  <p className="text-sm text-muted-foreground">
                    Distância: {selectedDistance}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* CTA */}
          {event.registrationOpen && !isRegistered && (
            <Button 
              className="w-full h-14 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold"
              onClick={() => setShowRegistration(true)}
            >
              Inscrever-se agora
            </Button>
          )}

          {/* Spacer for safe area */}
          <div className="h-4" />
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={showRegistration} onOpenChange={setShowRegistration}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Inscrição</DialogTitle>
            <DialogDescription>
              Escolha a distância para {event.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Select value={selectedDistance} onValueChange={setSelectedDistance}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione a distância" />
              </SelectTrigger>
              <SelectContent>
                {event.distances.map(distance => (
                  <SelectItem key={distance} value={distance}>
                    {distance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleRegistration}
            >
              Confirmar inscrição
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
