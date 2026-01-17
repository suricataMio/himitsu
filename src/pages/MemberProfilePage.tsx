/**
 * 成员详情页
 *
 * 点击首页成员头像后进入，展示生日与个人信息。
 */
import { differenceInDays, format, isAfter, isSameDay, startOfDay } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Lunar } from "lunar-javascript";
import { Link } from "wouter";

import avatarCouple from "@/assets/avatar-couple.jpeg";
import { AnniversaryDetails } from "@/components/anniversary/AnniversaryDetails";
import { DailyStatus } from "@/components/home/DailyStatus";
import { HomeBackground } from "@/components/home/HomeBackground";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MemberId = "aokiba" | "xiaoqian";

type MemberProfile = {
  id: MemberId;
  name: string;
  role: string;
  avatar: string;
  birthday: {
    type: "solar" | "lunar";
    label: string;
    month?: number;
    day?: number;
    lunarMonth?: number;
    lunarDay?: number;
  };
  tagline: string;
};

const memberProfiles: Record<MemberId, MemberProfile> = {
  aokiba: {
    id: "aokiba",
    name: "Aokiba",
    role: "男主人",
    avatar: avatarCouple,
    birthday: {
      type: "lunar",
      label: "农历九月廿五",
      lunarMonth: 9,
      lunarDay: 25,
    },
    tagline: "守护家与猫咪的温柔力量。",
  },
  xiaoqian: {
    id: "xiaoqian",
    name: "晓倩",
    role: "女主人",
    avatar: avatarCouple,
    birthday: {
      type: "solar",
      label: "8月17日",
      month: 7,
      day: 17,
    },
    tagline: "把生活的细节都点亮。",
  },
};

type MemberProfilePageProps = {
  params?: {
    memberId?: string;
  };
};

function getNextSolarBirthday(month: number, day: number) {
  const today = startOfDay(new Date());
  let date = startOfDay(new Date(today.getFullYear(), month, day));
  if (isAfter(today, date)) {
    date = startOfDay(new Date(today.getFullYear() + 1, month, day));
  }
  return date;
}

function getNextLunarBirthday(lunarMonth: number, lunarDay: number) {
  const today = startOfDay(new Date());
  const candidates = [today.getFullYear(), today.getFullYear() + 1].map((year) => {
    const solar = Lunar.fromYmd(year, lunarMonth, lunarDay).getSolar();
    return startOfDay(new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay()));
  });
  return (
    candidates.find((date) => isAfter(date, today) || isSameDay(date, today)) ??
    candidates[0]
  );
}

export default function MemberProfilePage({ params }: MemberProfilePageProps) {
  const rawId = params?.memberId;
  const memberId: MemberId = rawId === "aokiba" ? "aokiba" : "xiaoqian";
  const profile = memberProfiles[memberId];
  const today = startOfDay(new Date());

  const nextBirthday =
    profile.birthday.type === "solar" && profile.birthday.month !== undefined && profile.birthday.day !== undefined
      ? getNextSolarBirthday(profile.birthday.month, profile.birthday.day)
      : getNextLunarBirthday(profile.birthday.lunarMonth ?? 9, profile.birthday.lunarDay ?? 25);

  const daysUntilBirthday = differenceInDays(nextBirthday, today);

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 overflow-hidden">
      <HomeBackground />
      <ScrollArea className="h-screen w-full relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <section className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl">✨</div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="p-1.5 rounded-full bg-primary/10 ring-4 ring-white/60">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-sm">
                    <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
                    <AvatarFallback className="bg-white text-muted-foreground font-bold">
                      {profile.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-foreground font-display">
                    {profile.name}
                  </h1>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{profile.tagline}</div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/60">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                生日信息
              </div>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>生日类型</span>
                  <span className="font-semibold text-foreground">
                    {profile.birthday.type === "solar" ? "公历" : "农历"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>生日标记</span>
                  <span className="font-semibold text-foreground">{profile.birthday.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>下次生日</span>
                  <span className="font-semibold text-foreground">
                    {format(nextBirthday, "yyyy年M月d日", { locale: zhCN })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>倒计时</span>
                  <span className="font-semibold text-foreground">
                    {daysUntilBirthday} 天
                  </span>
                </div>
              </div>
            </section>

            <AnniversaryDetails />
          </div>

          <DailyStatus variant="work" />
        </div>
      </ScrollArea>
    </div>
  );
}
