/**
 * 首页装饰性背景组件
 *
 * 创建柔和的渐变光晕背景效果：
 * - 左上角粉橙色光晕，带呼吸动画
 * - 右下角蓝紫色光晕，带呼吸动画
 *
 * 使用 fixed 定位覆盖全屏，z-index 为 0 不影响内容交互
 * pointer-events-none 确保不拦截点击事件
 */
import { motion } from "framer-motion";

export function HomeBackground() {
  return (
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
  );
}
