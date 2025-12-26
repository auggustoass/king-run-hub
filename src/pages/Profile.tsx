import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { mockResults, formatDate } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Trophy, 
  Medal,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  MapPin,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Até logo!',
      description: 'Você saiu da sua conta.',
    });
    navigate('/auth');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-secondary overflow-hidden ring-4 ring-accent/20">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Membro desde {formatDate(user.createdAt)}
          </p>
        </Card>

        {/* Stats */}
        <Card className="p-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold mb-4">Resumo</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-secondary">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{user.totalRaces}</div>
              <div className="text-xs text-muted-foreground">Corridas</div>
            </div>
            <div className="p-3 rounded-lg bg-secondary">
              <Medal className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{user.totalMedals}</div>
              <div className="text-xs text-muted-foreground">Medalhas</div>
            </div>
            <div className="p-3 rounded-lg bg-secondary">
              <Award className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">#{user.averagePosition}</div>
              <div className="text-xs text-muted-foreground">Posição média</div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="divide-y animate-fade-in" style={{ animationDelay: '200ms' }}>
          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Meus certificados</h3>
              <p className="text-sm text-muted-foreground">Baixe seus certificados de conclusão</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Medal className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Minhas medalhas</h3>
              <p className="text-sm text-muted-foreground">Veja suas conquistas</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Configurações</h3>
              <p className="text-sm text-muted-foreground">Edite seu perfil e preferências</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </Card>

        {/* Race History */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-lg font-bold">Histórico de corridas</h2>
          
          {mockResults.map((result, index) => (
            <Card 
              key={result.id} 
              className="p-4 space-y-3"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{result.eventName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(result.date)}</span>
                  </div>
                </div>
                <Badge variant="outline">{result.distance}</Badge>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="text-xl font-bold text-accent">{result.time}</div>
                  <div className="text-xs text-muted-foreground">Tempo</div>
                </div>
                <div>
                  <div className="text-xl font-bold">#{result.generalPosition}</div>
                  <div className="text-xs text-muted-foreground">Geral</div>
                </div>
                <div>
                  <div className="text-xl font-bold">#{result.categoryPosition}</div>
                  <div className="text-xs text-muted-foreground">{result.category}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-1" />
                  Certificado
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Compartilhar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Button 
          variant="ghost" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair da conta
        </Button>

        {/* Spacer */}
        <div className="h-4" />
      </div>
    </MobileLayout>
  );
}
