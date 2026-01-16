/**
 * 首页组件
 *
 * 秘密基地的主页面，包含以下主要区域：
 * - 欢迎动画：两只小猫跑来迎接
 * - 家庭主图：展示公会信息
 * - 羁绊计时器：显示在一起的天数
 * - 事件列表：即将到来的纪念日和生日
 * - 成员名录：公会所有成员展示
 */
import { ScrollArea } from "@/components/ui/scroll-area";

import { BondAndEvents } from "@/components/home/BondAndEvents";
import { FamilyBanner } from "@/components/home/FamilyBanner";
import { HomeBackground } from "@/components/home/HomeBackground";
import { HomeFooter } from "@/components/home/HomeFooter";
import { HomeHeader } from "@/components/home/HomeHeader";
import { MemberRoster } from "@/components/home/MemberRoster";
import { WelcomeAnimation } from "@/components/home/WelcomeAnimation";

/**
 * 首页主组件
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 overflow-hidden">
      {/* 欢迎动画层 */}
      <WelcomeAnimation />

      {/* 装饰性背景元素 - 渐变光晕效果 */}
      <HomeBackground />

      {/* 主内容滚动区域 */}
      <ScrollArea className="h-screen w-full relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">

          <HomeHeader />
          <FamilyBanner />
          <BondAndEvents />
          <MemberRoster />
          <HomeFooter />
        </div>
      </ScrollArea>
    </div>
  );
}
