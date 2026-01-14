/**
 * 工作日状态卡片
 *
 * 展示工作日的作息时间表。
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const weekdayStatus = [
  {
    time: "07:40",
    title: "起床",
    person: "我们",
  },
  {
    time: "08:20",
    title: "晓倩出发上班",
    person: "晓倩",
  },
  {
    time: "10:00",
    title: "出发上班",
    person: "我",
  },
  {
    time: "18:20",
    title: "晓倩到家",
    person: "晓倩",
  },
  {
    time: "21:30",
    title: "到家",
    person: "我",
  },
  {
    time: "23:00",
    title: "睡觉",
    person: "我们",
  },
];

export function DailyStatus() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          工作日状态
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {weekdayStatus.map((status) => (
            <div
              key={`${status.time}-${status.title}`}
              className="flex items-center justify-between gap-4 rounded-xl border border-transparent bg-muted/40 px-4 py-3 transition-all duration-200 hover:border-secondary/20 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="min-w-[72px] rounded-full bg-white px-3 py-1 text-center text-xs font-semibold text-primary/80 shadow-sm">
                  {status.time}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground/90">{status.title}</p>
                  <p className="text-xs text-muted-foreground">{status.person}</p>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary/80">
                工作日
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
