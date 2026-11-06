import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import { subscribeToCurrentTime } from "@/lib/currentTime";

export function HomeDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => subscribeToCurrentTime(setNow), []);

  return (
    <div className="text-sm text-muted-foreground text-right">
      <div className="flex items-center justify-end gap-2 text-2xl font-black text-foreground tracking-tight">
        <Clock className="h-5 w-5 text-primary/80" />
        <span>{format(now, "HH:mm")}</span>
      </div>
      <div className="mt-1">{format(now, "yyyy年M月d日 EEEE", { locale: zhCN })}</div>
    </div>
  );
}
