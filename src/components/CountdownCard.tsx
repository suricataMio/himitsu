import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDaysTogether } from "@/lib/events";
import { Heart } from "lucide-react";

export function CountdownCard() {
  const days = getDaysTogether();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          我们在一起已经
        </CardTitle>
        <Heart className="h-4 w-4 text-rose-400 fill-rose-400 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary tracking-tight">
          {days} <span className="text-lg font-normal text-muted-foreground">天</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          始于 2021年1月1日
        </p>
      </CardContent>
    </Card>
  );
}
