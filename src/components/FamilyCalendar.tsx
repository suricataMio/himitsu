import { Card, CardContent } from "@/components/ui/card";
import { type FamilyEvent, getEventsForYear } from "@/lib/events";
import { format, isSameDay } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Lunar } from "lunar-javascript";
import { useEffect, useState } from "react";

export function FamilyCalendar() {
  // Always fixed to today
  const [date] = useState<Date>(new Date());
  const [events, setEvents] = useState<FamilyEvent[]>([]);
  const [lunarDate, setLunarDate] = useState<string>('');

  useEffect(() => {
    const year = new Date().getFullYear();
    const loadedEvents = [
        ...getEventsForYear(year),
        ...getEventsForYear(year + 1)
    ];
    setEvents(loadedEvents);
  }, []);

  useEffect(() => {
      if (date) {
          const lunar = Lunar.fromDate(date);
          setLunarDate(`${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`);
      }
  }, [date]);

  const selectedEvents = events.filter(e => isSameDay(e.date, date));

  return (
      <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm h-full flex flex-col justify-center min-h-[300px]">
          <CardContent className="p-8 flex flex-col items-center text-center justify-center flex-1">
              <div className="text-6xl font-black text-primary font-display mb-3 tracking-tight drop-shadow-sm">
                  {format(date, 'M月d日', { locale: zhCN })}
              </div>
              <div className="text-xl text-muted-foreground mb-8 flex gap-3 items-center font-medium">
                  <span>{format(date, 'EEEE', { locale: zhCN })}</span>
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  <span>农历{lunarDate}</span>
              </div>

              {selectedEvents.length > 0 ? (
                  <div className="space-y-3 w-full max-w-md">
                      {selectedEvents.map(e => (
                          <div key={e.id} className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl text-foreground/80 animate-in fade-in slide-in-from-bottom-2 border border-primary/5 shadow-sm">
                              <div className="font-bold text-primary text-lg">{e.title}</div>
                              {e.description && <div className="text-sm opacity-80 mt-1">{e.description}</div>}
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-muted-foreground/60 italic py-4 bg-muted/30 px-6 rounded-full text-sm">
                      今天是个平凡而美好的日子 ✨
                  </div>
              )}
          </CardContent>
      </Card>
  );
}
