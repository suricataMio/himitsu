/**
 * 工作日状态卡片
 *
 * 展示工作日的作息时间表。
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import avatarBlue from "@/assets/avatar-cat-blue.jpeg";
import avatarWhite from "@/assets/avatar-cat-white.jpeg";
import { Clock, PawPrint, PhoneCall } from "lucide-react";
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

const catSchedule = [
  {
    time: "23:00 - 08:00",
    title: "在沙发上睡觉",
    icon: "🛋️",
    key: "sleep",
  },
  {
    time: "08:00 - 12:00",
    title: "在房间走动",
    icon: "🐾",
    key: "walk",
  },
  {
    time: "12:00 - 18:00",
    title: "在阳台晒太阳",
    icon: "🌤️",
    key: "sun",
  },
];

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

  const catStatus = useMemo(() => {
    const minutes = getMinutes(now);
    if (minutes >= 23 * 60 || minutes < 8 * 60) {
      return {
        text: "在沙发上睡觉",
        icon: "🛋️",
        tone: "text-indigo-500",
        key: "sleep",
      };
    }
    if (minutes >= 8 * 60 && minutes < 12 * 60) {
      return {
        text: "在房间走动",
        icon: "🐾",
        tone: "text-amber-500",
        key: "walk",
      };
    }
    if (minutes >= 12 * 60 && minutes < 18 * 60) {
      return {
        text: "在阳台晒太阳",
        icon: "🌤️",
        tone: "text-orange-500",
        key: "sun",
      };
    }
    return { text: "自由活动中", icon: "😺", tone: "text-emerald-500", key: "free" };
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
        <div className="mb-4 rounded-2xl border border-secondary/20 bg-white/70 px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground/90">猫咪状态流转</p>
              <p className="text-xs text-muted-foreground">现在：{catStatus.text}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              <motion.span
                className="inline-flex"
                animate={{ rotate: [-6, 8, -6], y: [0, -3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <PawPrint className={`h-4 w-4 ${catStatus.tone}`} />
              </motion.span>
              <motion.span
                className="text-base"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {catStatus.icon}
              </motion.span>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {catSchedule.map((status, index) => (
              <motion.div
                key={status.time}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs ${
                  status.key === catStatus.key
                    ? "bg-primary/10 text-foreground shadow-sm"
                    : "bg-white/80 text-muted-foreground"
                }`}
                animate={
                  status.key === catStatus.key
                    ? { y: [0, -2, 0], boxShadow: "0 8px 20px rgba(249, 115, 22, 0.15)" }
                    : { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                }
                transition={{
                  duration: 1.6,
                  repeat: status.key === catStatus.key ? Infinity : 0,
                  ease: "easeInOut",
                  delay: index * 0.05,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{status.icon}</span>
                  <span className="font-semibold text-foreground/80">{status.title}</span>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary/80">
                  {status.time}
                </span>
              </motion.div>
            ))}
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
