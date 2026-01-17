/**
 * 首页头部组件
 *
 * 显示欢迎语和网站标题：
 * - 跳动的爱心图标
 * - "欢迎回家" 主标题
 * - "Aokiba & 晓倩 的秘密基地" 副标题
 *
 * 使用 framer-motion 实现入场动画和悬浮效果
 */
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <motion.header
      className="flex flex-col items-center text-center gap-3 pt-3 md:pt-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="inline-flex items-center justify-center p-3 bg-white/90 rounded-full shadow-sm ring-4 ring-white/60 hover:scale-110 transition-transform cursor-pointer"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="text-rose-400 fill-rose-400 w-6 h-6 animate-pulse" />
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-black text-foreground font-display tracking-tight drop-shadow-sm">
        欢迎回家
      </h1>
      <Button asChild size="sm" className="mt-1 rounded-full px-6 shadow-sm">
        <Link href="/anniversary">纪念日</Link>
      </Button>
    </motion.header>
  );
}
