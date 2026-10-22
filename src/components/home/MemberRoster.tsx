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
import { Link } from "wouter";

import avatarBlue from "@/assets/avatar-cat-blue.jpeg";
import avatarWhite from "@/assets/avatar-cat-white.jpeg";
import avatarCouple from "@/assets/avatar-couple.jpeg";
import { MemberProfile } from "@/components/home/MemberProfile";
import { cn } from "@/lib/utils";

type MemberRosterVariant = "default" | "compact";

type MemberRosterProps = {
  variant?: MemberRosterVariant;
};

export function MemberRoster({ variant = "default" }: MemberRosterProps) {
  const isCompact = variant === "compact";

  return (
    <motion.section
      className={cn(
        "relative overflow-hidden",
        isCompact
          ? "bg-transparent p-0"
          : "bg-white/60 backdrop-blur-sm rounded-3xl px-6 py-10 md:px-10 shadow-sm border border-white/50"
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {!isCompact ? (
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🏰</div>
      ) : null}
      <div
        className={cn(
          isCompact
            ? "flex flex-wrap items-center justify-start gap-4 md:gap-6"
            : "grid grid-cols-2 md:grid-cols-4 place-items-center gap-8 md:gap-12"
        )}
      >
        <Link href="/member/aokiba" className="block">
          <MemberProfile
            name="Aokiba"
            imageSrc={avatarCouple}
            color="bg-blue-100"
            size={isCompact ? "compact" : "default"}
          />
        </Link>
        <Link href="/member/xiaoqian" className="block">
          <MemberProfile
            name="晓倩"
            imageSrc={avatarCouple}
            color="bg-pink-100"
            size={isCompact ? "compact" : "default"}
          />
        </Link>
        <Link href="/cat/sweet" className="block">
          <MemberProfile
            name="甜心"
            imageSrc={avatarBlue}
            color="bg-indigo-100"
            className={isCompact ? undefined : "w-48"}
            size={isCompact ? "compact" : "default"}
          />
        </Link>
        <Link href="/cat/cake" className="block">
          <MemberProfile
            name="蛋糕"
            imageSrc={avatarWhite}
            color="bg-orange-100"
            className={isCompact ? undefined : "w-48"}
            size={isCompact ? "compact" : "default"}
          />
        </Link>
      </div>
    </motion.section>
  );
}
