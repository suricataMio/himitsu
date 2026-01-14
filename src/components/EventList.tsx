import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FamilyEvent, getUpcomingEvents } from "@/lib/events";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Cake, Calendar as CalendarIcon, Heart } from "lucide-react";

export function EventList() {
  const events = getUpcomingEvents(4);

  const getIcon = (type: FamilyEvent['type']) => {
    switch (type) {
      case 'birthday': return <Cake className="h-4 w-4 text-orange-400" />;
      case 'anniversary': return <Heart className="h-4 w-4 text-rose-400" />;
      default: return <CalendarIcon className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            即将到来的美好
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-secondary/20 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(event.type)}
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm text-foreground/90">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(event.date, 'yyyy年M月d日', { locale: zhCN })} 
                    <span className="ml-1 opacity-70">({format(event.date, 'EEEE', { locale: zhCN })})</span>
                  </p>
                </div>
              </div>
              <div className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                 {Math.ceil((event.date.getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))} 天后
              </div>
            </div>
          ))}
          {events.length === 0 && (
              <div className="text-center text-muted-foreground py-4 text-sm">
                  暂时没有即将到来的事件
              </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
