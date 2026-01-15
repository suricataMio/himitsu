/**
 * 每日状态卡片组件
 *
 * 根据当前时间动态显示家庭成员状态：
 *
 * 【人员状态】
 * - 工作日：根据时间判断谁在上班（晓倩 08:20-18:20，我 10:00-21:30）
 * - 周末：显示"大家都在家"的温馨动画
 * - 上班中：显示头像 + 🧱搬砖动画
 * - 在家中：显示头像 + 🏠房子图标
 *
 * 【猫咪状态流转】
 * - 23:00-08:00：在沙发上睡觉 🛋️
 * - 08:00-12:00：在房间走动 🐾
 * - 12:00-18:00：在阳台晒太阳 🌤️
 * - 其他时间：自由活动中 😺
 *
 * 状态每分钟自动刷新一次
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import avatarBlue from "@/assets/avatar-cat-blue.jpeg";
import avatarWhite from "@/assets/avatar-cat-white.jpeg";
import { Clock, PawPrint, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";



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

    // 周末模式：大家都在家
    if (!isWeekday) {
      return {
        isWeekend: true,
        activeWorkers: [],
        homeMembers: [
          {
            key: "xiaoqian",
            name: "晓倩",
            avatar: avatarWhite,
            accent: "text-pink-500",
          },
          {
            key: "me",
            name: "我",
            avatar: avatarBlue,
            accent: "text-blue-500",
          },
        ],
        statusText: "周末时光 · 都在家里",
      };
    }

    const xiaoqianWorking =
      minutes >= scheduleMinutes.xiaoqianStart && minutes < scheduleMinutes.xiaoqianEnd;
    const meWorking = minutes >= scheduleMinutes.meStart && minutes < scheduleMinutes.meEnd;

    const allMembers = [
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
    ];

    const activeWorkers = allMembers.filter((worker) => worker.isWorking);
    const homeMembers = allMembers.filter((worker) => !worker.isWorking);

    if (activeWorkers.length === 0) {
      return {
        isWeekend: false,
        activeWorkers,
        homeMembers,
        statusText: "都在家里"
      };
    }

    return {
      isWeekend: false,
      activeWorkers,
      homeMembers,
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
        <div className={`mb-4 rounded-2xl border px-4 py-3 shadow-sm ${workStatus.isWeekend
          ? "border-pink-200 bg-gradient-to-r from-pink-50/80 to-orange-50/80"
          : "border-secondary/20 bg-white/70"
          }`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground/90">
                {workStatus.isWeekend ? "🏠 周末时光" : "当前上班状态"}
              </p>
              <p className="text-xs text-muted-foreground">{workStatus.statusText}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* 周末模式：显示大家都在家的温馨动画 */}
              {workStatus.isWeekend && workStatus.homeMembers && (
                <div className="flex items-center gap-3">
                  {workStatus.homeMembers.map((member, index) => (
                    <motion.div
                      key={member.key}
                      className="relative flex flex-col items-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      <motion.div
                        className="relative"
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <img
                          src={member.avatar}
                          alt={`${member.name} at home`}
                          className="h-12 w-12 rounded-full object-cover shadow-md ring-2 ring-pink-200"
                        />
                        <motion.span
                          className="absolute -right-1 -top-1 text-sm"
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          💕
                        </motion.span>
                      </motion.div>
                      <span className="mt-1 text-[10px] font-medium text-foreground/80">
                        {member.name}
                      </span>
                    </motion.div>
                  ))}
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.span
                      className="text-2xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🏡
                    </motion.span>
                    <span className="text-[10px] text-pink-500 font-medium">在家</span>
                  </motion.div>
                </div>
              )}

              {/* 工作日模式：上班中的成员 */}
              {!workStatus.isWeekend && workStatus.activeWorkers.length > 0 && (
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
              )}

              {/* 工作日模式：在家的成员 */}
              {!workStatus.isWeekend && workStatus.homeMembers && workStatus.homeMembers.length > 0 && (
                workStatus.homeMembers.map((member, index) => (
                  <motion.div
                    key={member.key}
                    className="relative flex flex-col items-center"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <img
                      src={member.avatar}
                      alt={`${member.name} at home`}
                      className="h-12 w-12 rounded-full object-cover shadow-md opacity-90"
                    />
                    <span className="mt-1 text-[10px] font-medium text-foreground/80">
                      {member.name}
                    </span>
                    <motion.span
                      className="absolute -right-1 -bottom-1 text-sm"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🏠
                    </motion.span>
                  </motion.div>
                ))
              )}

              {/* 如果没有任何人的数据（异常情况） */}
              {!workStatus.isWeekend &&
                workStatus.activeWorkers.length === 0 &&
                (!workStatus.homeMembers || workStatus.homeMembers.length === 0) && (
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
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs ${status.key === catStatus.key
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
      </CardContent>
    </Card>
  );
}
