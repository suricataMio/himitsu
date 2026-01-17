/**
 * 铲屎官仪表盘组件
 *
 * 综合展示猫咪健康管理信息：
 * - 体重记录卡片（WeightRecordCard）
 * - 疫苗和驱虫提醒概览
 * - 护理清单（称重、营养膏、指甲修剪）
 * - 甜心 & 蛋糕体重变化曲线图（使用 Recharts）
 * - 每日状态卡片（DailyStatus）：根据时间显示猫咪状态
 */
import { motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { CatWeightCard } from "@/components/home/CatWeightCard";
import { DailyStatus } from "@/components/home/DailyStatus";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type CatId = "sweet" | "cake";

const weightData = [
  { month: "2月", sweet: 4.1, cake: 4.7 },
  { month: "3月", sweet: 4.2, cake: 4.6 },
  { month: "4月", sweet: 4.3, cake: 4.5 },
  { month: "5月", sweet: 4.25, cake: 4.6 },
  { month: "6月", sweet: 4.35, cake: 4.55 },
  { month: "7月", sweet: 4.4, cake: 4.5 },
];

type StatusTone = "ok" | "soon" | "due";

export const catProfiles: Record<
  CatId,
  {
    name: string;
    lineKey: CatId;
    chartColor: string;
    latestWeight: { date: Date; value: string; unit: string };
    statusItems: {
      label: string;
      value: string;
      progress: number;
      tone: StatusTone;
    }[];
  }
> = {
  sweet: {
    name: "甜心",
    lineKey: "sweet",
    chartColor: "var(--chart-1)",
    latestWeight: {
      date: new Date(),
      value: "7.8",
      unit: "斤",
    },
    statusItems: [
      {
        label: "疫苗",
        value: "剩余 18 天",
        progress: 65,
        tone: "soon",
      },
      {
        label: "驱虫",
        value: "剩余 32 天",
        progress: 40,
        tone: "ok",
      },
    ],
  },
  cake: {
    name: "蛋糕",
    lineKey: "cake",
    chartColor: "var(--chart-2)",
    latestWeight: {
      date: new Date(),
      value: "7.2",
      unit: "斤",
    },
    statusItems: [
      {
        label: "疫苗",
        value: "剩余 7 天",
        progress: 85,
        tone: "due",
      },
      {
        label: "驱虫",
        value: "剩余 21 天",
        progress: 55,
        tone: "soon",
      },
    ],
  },
};

interface CatCareDashboardProps {
  catId?: CatId;
}

export function CatCareDashboard({ catId = "sweet" }: CatCareDashboardProps) {
  const cat = catProfiles[catId] ?? catProfiles.sweet;
  const weightChartConfig = {
    [cat.lineKey]: {
      label: cat.name,
      color: cat.chartColor,
    },
  };

  return (
    <motion.section
      className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <CatWeightCard name={cat.name} latestWeight={cat.latestWeight} />
      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🐱</div>
      <div className="flex flex-col gap-2 text-center md:text-left md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground/80 font-display">
            🐱 {cat.name}仪表盘
          </h3>
          <p className="text-sm text-muted-foreground">
            记录体重趋势与日常状态，守护每一次小变化。
          </p>
        </div>
        <div className="text-xs text-muted-foreground">数据更新：本周</div>
      </div>

      <div className="mt-6">
        <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-sm font-bold text-foreground">{cat.name}体重变化曲线</h4>
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
              <Line dataKey={cat.lineKey} stroke={`var(--color-${cat.lineKey})`} strokeWidth={3} dot={false} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
      <DailyStatus variant="cat" />
    </motion.section>
  );
}
