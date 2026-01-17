/**
 * 纪念日详情组件
 *
 * 展示在一起天数与纪念日日期。
 */
import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { getDaysTogether } from "@/lib/events";

type AnniversaryDetailsProps = {
  className?: string;
};

export function AnniversaryDetails({ className }: AnniversaryDetailsProps) {
  const daysTogether = getDaysTogether();
  const anniversaryDate = parseISO("2021-01-01");

  return (
    <section
      className={cn(
        "bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/60",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Heart className="h-4 w-4 text-rose-400" />
        纪念时刻
      </div>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>在一起天数</span>
          <span className="font-semibold text-foreground">{daysTogether} 天</span>
        </div>
        <div className="flex items-center justify-between">
          <span>纪念日</span>
          <span className="font-semibold text-foreground">
            {format(anniversaryDate, "yyyy年M月d日", { locale: zhCN })}
          </span>
        </div>
        <div className="rounded-2xl bg-primary/5 px-4 py-3 text-xs text-foreground/70">
          重要时刻都值得被认真记录，回到这里随时查看。
        </div>
      </div>
    </section>
  );
}
