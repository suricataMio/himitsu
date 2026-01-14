/**
 * 工作日状态卡片
 *
 * 展示工作日的作息时间表。
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import avatarBlue from "@/assets/avatar-cat-blue.jpeg";
import avatarWhite from "@/assets/avatar-cat-white.jpeg";
import { Clock, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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

const scheduleMinutes = {
  xiaoqianStart: 8 * 60 + 20,
  xiaoqianEnd: 18 * 60 + 20,
  meStart: 10 * 60,
  meEnd: 21 * 60 + 30,
};

function getMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function DailyStatus() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const workStatus = useMemo(() => {
    const minutes = getMinutes(now);
    const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
    if (!isWeekday) {
      return { activeWorkers: [], statusText: "周末休息中" };
    }

    const xiaoqianWorking =
      minutes >= scheduleMinutes.xiaoqianStart && minutes < scheduleMinutes.xiaoqianEnd;
    const meWorking = minutes >= scheduleMinutes.meStart && minutes < scheduleMinutes.meEnd;

    const activeWorkers = [
      {
        key: "xiaoqian",
        name: "晓倩",
        avatar: avatarWhite,
        isWorking: xiaoqianWorking,
        accent: "text-pink-500",
      },
      {
        key: "me",
        name: "我",
        avatar: avatarBlue,
        isWorking: meWorking,
        accent: "text-blue-500",
      },
    ].filter((worker) => worker.isWorking);

    if (activeWorkers.length === 0) {
      return { activeWorkers, statusText: "目前没人上班" };
    }

    return {
      activeWorkers,
      statusText: `正在上班：${activeWorkers.map((worker) => worker.name).join("、")}`,
    };
  }, [now]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-secondary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          工作日状态
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-2xl border border-secondary/20 bg-white/70 px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground/90">当前上班状态</p>
              <p className="text-xs text-muted-foreground">{workStatus.statusText}</p>
            </div>
            <div className="flex items-center gap-4">
              {workStatus.activeWorkers.length > 0 ? (
                workStatus.activeWorkers.map((worker, index) => (
                  <motion.div
                    key={worker.key}
                    className="relative flex flex-col items-center"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <img
                      src={worker.avatar}
                      alt={`${worker.name} working`}
                      className="h-12 w-12 rounded-full object-cover shadow-md"
                    />
                    <span className="mt-1 text-[10px] font-medium text-foreground/80">
                      {worker.name}
                    </span>
                    <span className="absolute -right-1 -bottom-1 rounded-full bg-white p-1 shadow">
                      <PhoneCall className={`h-3 w-3 ${worker.accent}`} />
                    </span>
                    <motion.span
                      className="absolute -left-2 -bottom-2 text-lg"
                      animate={{ rotate: [0, 12, -12, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🧱
                    </motion.span>
                  </motion.div>
                ))
              ) : (
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  休息中
                </span>
              )}
            </div>
          </div>
        </div>
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
