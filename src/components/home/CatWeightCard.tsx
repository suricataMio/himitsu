/**
 * 猫咪体重记录卡片组件
 *
 * 显示甜心最近一次的体重记录：
 * - 记录日期
 * - 体重数值（斤）
 * - 状态说明
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Scale } from "lucide-react";

const latestSweetieWeight = {
  date: new Date(),
  value: "7.8",
  unit: "斤",
};

export function CatWeightCard() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          甜心体重记录
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground/80">最近一次</p>
              <p className="text-xs text-muted-foreground">
                今天 · {format(latestSweetieWeight.date, "yyyy年M月d日", { locale: zhCN })}
              </p>
            </div>
            <div className="text-2xl font-black text-primary">
              {latestSweetieWeight.value}
              <span className="ml-1 text-sm font-semibold text-primary/80">
                {latestSweetieWeight.unit}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            最近记录：甜心今天体重 {latestSweetieWeight.value}
            {latestSweetieWeight.unit}，状态稳定。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
