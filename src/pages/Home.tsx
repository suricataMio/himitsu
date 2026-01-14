/**
 * 首页组件
 * 
 * 秘密基地的主页面，包含以下主要区域：
 * - 欢迎动画：两只小猫跑来迎接
 * - Hero 区域：展示家庭主图
 * - 羁绊计时器：显示在一起的天数
 * - 事件列表：即将到来的纪念日和生日
 * - 成员名录：公会所有成员展示
 */
import heroImage from "@/assets/hero-anime.jpeg";
import avatarBlue from "@/assets/avatar-cat-blue.jpeg";
import avatarWhite from "@/assets/avatar-cat-white.jpeg";
import avatarCouple from "@/assets/avatar-couple.jpeg";
import catBlueRun from "@/assets/cat-blue-run.png";
import catWhiteRun from "@/assets/cat-white-run.png";

import { CountdownCard } from "@/components/CountdownCard";
import { DailyStatus } from "@/components/DailyStatus";
import { EventList } from "@/components/EventList";

import { MemberProfile } from "@/components/MemberProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import { getDaysTogether } from "@/lib/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * 欢迎动画组件
 * 
 * 当用户首次访问页面时播放的迎宾动画：
 * - 两只小猫（甜心和蛋糕）从屏幕两侧跑向中央
 * - 显示"欢迎回家"的对话气泡
 * - 动画持续4.5秒后自动消失
 */
function WelcomeAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 动画展示4.5秒，配合较慢的走路动画
    const timer = setTimeout(() => setShow(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-white/60 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
           <div className="relative w-full max-w-2xl h-full flex items-end justify-center pb-20">
              {/* 蓝猫（甜心）- 从左侧走来 */}
              <motion.img
                src={catBlueRun}
                className="h-48 absolute bottom-4"
                initial={{ x: -600, opacity: 0, scale: 0.8 }}
                animate={{ x: -60, opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
               {/* 白猫（蛋糕）- 从右侧走来 */}
              <motion.img
                src={catWhiteRun}
                className="h-48 absolute bottom-20"
                initial={{ x: 600, opacity: 0, scale: 0.8 }}
                animate={{ x: 60, opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
              
              {/* 欢迎对话气泡 */}
               <motion.div
                className="absolute bottom-56 bg-white border-4 border-primary px-8 py-4 rounded-3xl shadow-xl z-10"
                initial={{ scale: 0, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ delay: 2.0, type: "spring" }}
               >
                 <div className="text-2xl font-black text-primary font-display tracking-widest">
                    欢迎回家! 
                 </div>
                 {/* 气泡箭头指向 */}
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-4 border-r-4 border-primary rotate-45"></div>
               </motion.div>

               {/* 装饰性星星特效 */}
               <motion.div 
                 className="absolute bottom-40 text-4xl"
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1.2, rotate: [0, 10, -10, 0] }}
                 transition={{ delay: 0.9 }}
               >
                 ✨
               </motion.div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * 首页主组件
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 overflow-hidden">
      {/* 欢迎动画层 */}
      <WelcomeAnimation />
      
      {/* 装饰性背景元素 - 渐变光晕效果 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-50">
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
      </div>

      {/* 主内容滚动区域 */}
      <ScrollArea className="h-screen w-full relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
          
          {/* 页面头部 - 标题和副标题 */}
          <motion.header
            className="flex flex-col items-center text-center space-y-2 pt-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-2 hover:scale-110 transition-transform cursor-pointer"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <Heart className="text-rose-400 fill-rose-400 w-6 h-6 animate-pulse" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground font-display tracking-tight drop-shadow-sm">
              欢迎回家
            </h1>
            <p className="text-primary font-bold text-lg">
              Aokiba & 晓倩 的秘密基地
            </p>
          </motion.header>

          {/* Hero 区域 - 主视觉图片 */}
          <motion.section
            className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/9] md:aspect-[21/9] group ring-4 ring-white/50"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img 
                src={heroImage} 
                alt="Secret Base" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* 图片上的渐变遮罩和文字 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                <div className="text-white drop-shadow-md">
                    <h2 className="text-2xl font-bold font-display flex items-center gap-2">
                        <span>两人两猫的奇妙冒险</span>
                        {/* 等级标签：根据在一起的年数计算 */}
                        <span className="text-xs bg-primary px-2 py-0.5 rounded-full">Lv.{Math.floor(getDaysTogether()/365)}</span>
                    </h2>
                    <p className="text-white/90 text-sm mt-1">公会成员: Aokiba, 晓倩, 甜心(Mage), 蛋糕(Warrior)</p>
                </div>
            </div>
          </motion.section>

          {/* 核心信息网格布局 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* 左侧：羁绊计时器卡片 */}
            <div className="md:col-span-1 h-full">
                <CountdownCard />
            </div>

            {/* 右侧：即将到来的事件列表 */}
            <div className="md:col-span-2">
                <EventList />
            </div>
          </motion.div>

          {/* 工作日状态卡片 */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <DailyStatus />
          </motion.section>

          {/* 公会成员名录区域 */}
          <motion.section
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* 装饰性城堡图标 */}
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🏰</div>
            <h3 className="text-center text-lg font-bold text-foreground/80 mb-8 font-display">公会成员名录</h3>
            {/* 成员头像展示 */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                <MemberProfile 
                    name="Aokiba" 
                    role="男主人" 
                    imageSrc={avatarCouple} 
                    color="bg-blue-100" 
                />
                <MemberProfile 
                    name="晓倩" 
                    role="女主人" 
                    imageSrc={avatarCouple} 
                    color="bg-pink-100" 
                />
                <MemberProfile 
                    name="甜心" 
                    role="可爱的蓝猫" 
                    imageSrc={avatarBlue} 
                    color="bg-indigo-100" 
                />
                <MemberProfile 
                    name="蛋糕" 
                    role="粘人的小白" 
                    imageSrc={avatarWhite} 
                    color="bg-orange-100" 
                />
            </div>
          </motion.section>

          {/* 页脚 */}
          <footer className="text-center py-8 text-sm text-muted-foreground/60">
            <p>© {new Date().getFullYear()} Family Guild. Mission Start: 2021.01.01</p>
          </footer>
        </div>
      </ScrollArea>
    </div>
  );
}
