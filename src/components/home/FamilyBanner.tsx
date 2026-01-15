/**
 * 家庭主横幅组件
 *
 * 展示家庭主题大图和基本信息：
 * - 全宽背景图片，支持悬停放大效果
 * - 底部渐变遮罩显示公会信息
 * - 等级徽章（根据在一起的年数计算）
 * - 公会成员列表
 *
 * 宽高比：移动端 16:9，桌面端 21:9
 */
import { motion } from "framer-motion";

import heroImage from "@/assets/hero-anime.jpeg";
import { getDaysTogether } from "@/lib/events";

export function FamilyBanner() {
  return (
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
        <div className="text-white drop-shadow-md">
          <h2 className="text-2xl font-bold font-display flex items-center gap-2">
            <span>两人两猫的奇妙冒险</span>
            <span className="text-xs bg-primary px-2 py-0.5 rounded-full">
              Lv.{Math.floor(getDaysTogether() / 365)}
            </span>
          </h2>
          <p className="text-white/90 text-sm mt-1">
            公会成员: Aokiba, 晓倩, 甜心(Mage), 蛋糕(Warrior)
          </p>
        </div>
      </div>
    </motion.section>
  );
}
