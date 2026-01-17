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
import { HomeDateTime } from "@/components/home/HomeDateTime";

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute right-4 top-4 rounded-2xl bg-white/55 px-4 py-2 shadow-sm ring-1 ring-white/40 backdrop-blur-md">
        <HomeDateTime />
      </div>
    </motion.section>
  );
}
