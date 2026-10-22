/**
 * 羁绊与事件区域组件
 *
 * 包含首页的核心数据展示：
 * - 羁绊倒计时（BondCountdown）：显示在一起的天数
 * - 即将到来的事件（UpcomingEvents）：纪念日和生日
 *
 * 布局采用响应式设计：移动端单列，桌面端 1:2 比例分布
 */
import { motion } from "framer-motion";

import { BondCountdown } from "@/components/home/BondCountdown";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";

export function BondAndEvents() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="md:col-span-1 h-full">
        <BondCountdown />
      </div>
      <div className="md:col-span-2">
        <UpcomingEvents />
      </div>
    </motion.div>
  );
}
