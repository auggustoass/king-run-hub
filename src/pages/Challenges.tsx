import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockChallenges, mockUserChallenges, formatDate } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Target, Trophy, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Challenges() {
  const { user } = useAuth();

  const getChallengeProgress = (challengeId: string) => {
    const userChallenge = mockUserChallenges.find(
      uc => uc.challengeId === challengeId && uc.userId === user?.id
    );
    return userChallenge || { progress: 0, completed: false };
  };

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-7 h-7 text-accent" />
            Desafios
          </h1>
          <p className="text-muted-foreground">
            Complete desafios e ganhe badges exclusivos
          </p>
        </div>

        {/* Active Challenges */}
        <div className="space-y-4">
          {mockChallenges.map((challenge, index) => {
            const { progress, completed } = getChallengeProgress(challenge.id);
            const progressPercent = Math.min((progress / challenge.goal) * 100, 100);
            const isExpired = new Date(challenge.endDate) < new Date();

            return (
              <Card 
                key={challenge.id}
                className={cn(
                  "overflow-hidden animate-fade-in",
                  completed && "ring-2 ring-success",
                  isExpired && !completed && "opacity-60"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header with sponsor */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img 
                      src={challenge.sponsorLogo}
                      alt={challenge.sponsor}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm text-muted-foreground">
                      Patrocinado por {challenge.sponsor}
                    </span>
                  </div>
                  {completed ? (
                    <Badge className="bg-success text-white">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completo
                    </Badge>
                  ) : isExpired ? (
                    <Badge variant="secondary">Encerrado</Badge>
                  ) : (
                    <Badge variant="outline">Ativo</Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <div className="flex gap-4">
                    {/* Badge Image */}
                    <div className={cn(
                      "w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0",
                      completed ? "bg-accent" : "bg-secondary"
                    )}>
                      <img 
                        src={challenge.badgeImageUrl}
                        alt="Badge"
                        className="w-16 h-16"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg">{challenge.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>
                          Até {formatDate(challenge.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Seu progresso</span>
                      <span className="font-semibold">
                        {progress} / {challenge.goal} {challenge.unit}
                      </span>
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className={cn(
                        "h-3",
                        completed && "[&>div]:bg-success"
                      )}
                    />
                  </div>

                  {/* Ranking link */}
                  {!isExpired && (
                    <button className="w-full py-3 text-center text-sm font-medium text-accent hover:underline flex items-center justify-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Ver ranking do desafio
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-secondary">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Como funcionam os desafios?
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Complete os objetivos dentro do prazo</li>
            <li>• Ganhe badges exclusivos para seu perfil</li>
            <li>• Participe dos rankings específicos</li>
            <li>• Concorra a prêmios dos patrocinadores</li>
          </ul>
        </Card>
      </div>
    </MobileLayout>
  );
}
