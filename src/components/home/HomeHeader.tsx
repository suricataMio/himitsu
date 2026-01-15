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

export function HomeHeader() {
  return (
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
      <p className="text-primary font-bold text-lg">Aokiba & 晓倩 的秘密基地</p>
    </motion.header>
  );
}
