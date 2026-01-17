import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-sm text-muted-foreground text-right">
      <div className="flex items-center justify-end gap-2 text-2xl font-black text-foreground tracking-tight">
        <Clock className="h-5 w-5 text-primary/80" />
      </div>
    </div>
  );
}
