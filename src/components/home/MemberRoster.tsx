/**
 * 公会成员名录组件
 *
 * 展示家庭所有成员信息：
 * - Aokiba（男主人）
 * - 晓倩（女主人）
 * - 甜心（蓝猫）- 包含疫苗和驱虫状态
 * - 蛋糕（白猫）- 包含疫苗和驱虫状态
 *
 * 每个成员使用 MemberProfile 子组件渲染头像、名称和状态信息
 */
import { motion } from "framer-motion";

import avatarBlue from "@/assets/avatar-cat-blue.jpeg";
import avatarWhite from "@/assets/avatar-cat-white.jpeg";
import avatarCouple from "@/assets/avatar-couple.jpeg";
import { Link } from "wouter";

import { MemberProfile } from "@/components/home/MemberProfile";

export function MemberRoster() {
  return (
    <motion.section
      className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50 relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🏰</div>
      <h3 className="text-center text-lg font-bold text-foreground/80 mb-8 font-display">
        公会成员名录
      </h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        <Link href="/member/aokiba" className="block">
          <MemberProfile name="Aokiba" role="男主人" imageSrc={avatarCouple} color="bg-blue-100" />
        </Link>
        <Link href="/member/xiaoqian" className="block">
          <MemberProfile name="晓倩" role="女主人" imageSrc={avatarCouple} color="bg-pink-100" />
        </Link>
        <Link href="/cat/sweet" className="block">
          <MemberProfile
            name="甜心"
            role="可爱的蓝猫"
            imageSrc={avatarBlue}
            color="bg-indigo-100"
            className="w-48"
          />
        </Link>
        <Link href="/cat/cake" className="block">
          <MemberProfile
            name="蛋糕"
            role="粘人的小白"
            imageSrc={avatarWhite}
            color="bg-orange-100"
            className="w-48"
          />
        </Link>
      </div>
    </motion.section>
  );
}
