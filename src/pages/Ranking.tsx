import { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRanking } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['Geral', 'M18-24', 'M25-29', 'M30-34', 'M35-39', 'F18-24', 'F25-29'];

export default function Ranking() {
  const [selectedCategory, setSelectedCategory] = useState('Geral');
  const { user } = useAuth();

  const userEntry = mockRanking.find(entry => entry.userId === user?.id);

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30';
      default:
        return '';
    }
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-7 h-7 text-accent" />
            Ranking
          </h1>
          <p className="text-muted-foreground">
            Veja sua posição entre os atletas KING RUN
          </p>
        </div>

        {/* User Position Card */}
        {userEntry && (
          <Card className="p-4 bg-accent/10 border-accent/30 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <span className="text-2xl font-black text-accent-foreground">
                  #{userEntry.position}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Sua posição</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span>{userEntry.points} pontos • {userEntry.totalRaces} corridas</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Category Filter */}
        <div className="overflow-x-auto -mx-4 px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="inline-flex w-auto h-auto p-1 gap-1">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="px-4 py-2 text-sm whitespace-nowrap"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Info */}
        <Card className="p-3 bg-secondary">
          <p className="text-sm text-muted-foreground text-center">
            O ranking é atualizado após cada corrida. Quanto mais você participa, mais pontos acumula!
          </p>
        </Card>

        {/* Ranking List */}
        <div className="space-y-2">
          {mockRanking.map((entry, index) => {
            const isCurrentUser = entry.userId === user?.id;
            
            return (
              <Card 
                key={entry.userId} 
                className={cn(
                  "p-4 flex items-center gap-4 transition-all animate-fade-in",
                  getPositionStyle(entry.position),
                  isCurrentUser && "ring-2 ring-accent"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Position */}
                <div className="w-10 flex items-center justify-center">
                  {getPositionIcon(entry.position) || (
                    <span className="text-lg font-bold text-muted-foreground">
                      {entry.position}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  {entry.userAvatar ? (
                    <img 
                      src={entry.userAvatar} 
                      alt={entry.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold">
                      {entry.userName.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={cn(
                      "font-semibold truncate",
                      isCurrentUser && "text-accent"
                    )}>
                      {entry.userName}
                    </h3>
                    {isCurrentUser && (
                      <Badge className="bg-accent text-accent-foreground text-xs">
                        Você
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.totalRaces} corridas
                  </p>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="font-bold text-lg">{entry.points}</div>
                  <div className="text-xs text-muted-foreground">pontos</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
}
