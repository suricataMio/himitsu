import { motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { DailyStatus } from "@/components/DailyStatus";
import { WeightRecordCard } from "@/components/WeightRecordCard";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const weightData = [
  { month: "2月", sweet: 4.1, cake: 4.7 },
  { month: "3月", sweet: 4.2, cake: 4.6 },
  { month: "4月", sweet: 4.3, cake: 4.5 },
  { month: "5月", sweet: 4.25, cake: 4.6 },
  { month: "6月", sweet: 4.35, cake: 4.55 },
  { month: "7月", sweet: 4.4, cake: 4.5 },
];

const weightChartConfig = {
  sweet: {
    label: "甜心",
    color: "var(--chart-1)",
  },
  cake: {
    label: "蛋糕",
    color: "var(--chart-2)",
  },
};

export function CaretakerDashboard() {
  return (
    <motion.section
      className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <WeightRecordCard />
      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🐱</div>
      <div className="flex flex-col gap-2 text-center md:text-left md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground/80 font-display">🐱 铲屎官仪表盘</h3>
          <p className="text-sm text-muted-foreground">
            疫苗与驱虫不再错过，甜心与蛋糕都在被认真照顾。
          </p>
        </div>
        <div className="text-xs text-muted-foreground">数据更新：本周</div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span>提醒概览</span>
              <span className="text-xs font-medium text-muted-foreground">（最近30天）</span>
            </h4>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">甜心 · 三联疫苗</p>
                  <p className="text-xs">剩余 18 天</p>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  即将到期
                </span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">蛋糕 · 驱虫</p>
                  <p className="text-xs">剩余 7 天</p>
                </div>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                  需要关注
                </span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">甜心 · 口服驱虫</p>
                  <p className="text-xs">剩余 32 天</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  状态良好
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground">护理清单</h4>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>本周称重</span>
                <span className="font-semibold text-foreground">已完成</span>
              </div>
              <div className="flex items-center justify-between">
                <span>补充营养膏</span>
                <span className="font-semibold text-foreground">进行中</span>
              </div>
              <div className="flex items-center justify-between">
                <span>指甲修剪提醒</span>
                <span className="font-semibold text-foreground">2 天后</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground">甜心 & 蛋糕体重变化曲线</h4>
                <p className="text-xs text-muted-foreground">单位：kg，最近半年记录</p>
              </div>
              <div className="text-xs text-muted-foreground">趋势平稳更安心</div>
            </div>
            <ChartContainer className="mt-4 h-56 w-full" config={weightChartConfig}>
              <LineChart data={weightData} margin={{ left: 0, right: 16, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value.toFixed(1)}`}
                  domain={[3.8, 5.0]}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  dataKey="sweet"
                  stroke="var(--color-sweet)"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  dataKey="cake"
                  stroke="var(--color-cake)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </div>
      <DailyStatus />
    </motion.section>
  );
}
