import { motion } from "framer-motion";

import { CountdownCard } from "@/components/CountdownCard";
import { EventList } from "@/components/EventList";

export function CoreInfoSection() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="md:col-span-1 h-full">
        <CountdownCard />
      </div>
      <div className="md:col-span-2">
        <EventList />
      </div>
    </motion.div>
  );
}
