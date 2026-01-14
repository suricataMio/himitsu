/**
 * 羁绊计时器卡片组件
 * 
 * 显示从纪念日起始日到今天的总天数
 * 带有心形图标和脉冲动画效果
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDaysTogether } from "@/lib/events";
import { Heart } from "lucide-react";

export function CountdownCard() {
  // 计算在一起的天数
  const days = getDaysTogether();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          我们在一起已经
        </CardTitle>
        {/* 心形图标带脉冲动画 */}
        <Heart className="h-4 w-4 text-rose-400 fill-rose-400 animate-pulse" />
      </CardHeader>
      <CardContent>
        {/* 天数显示 */}
        <div className="text-4xl font-bold text-primary tracking-tight">
          {days} <span className="text-lg font-normal text-muted-foreground">天</span>
        </div>
        {/* 起始日期提示 */}
        <p className="text-xs text-muted-foreground mt-1">
          始于 2021年1月1日
        </p>
      </CardContent>
    </Card>
  );
}
