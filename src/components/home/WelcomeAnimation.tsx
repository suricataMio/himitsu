/**
 * 欢迎动画组件
 *
 * 当用户首次访问页面时播放的迎宾动画：
 * - 两只小猫（甜心和蛋糕）从屏幕两侧跑向中央
 * - 显示"欢迎回家"的对话气泡
 * - 动画持续4.5秒后自动消失
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import catBlueRun from "@/assets/cat-blue-run.png";
import catWhiteRun from "@/assets/cat-white-run.png";

export function WelcomeAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
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
