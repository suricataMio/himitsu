/**
 * 纪念日详情页
 *
 * 从首页的“纪念人”入口进入，展示纪念日相关信息。
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

import { AnniversaryDetails } from "@/components/anniversary/AnniversaryDetails";
import { HomeBackground } from "@/components/home/HomeBackground";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AnniversaryPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 overflow-hidden">
      <HomeBackground />
      <ScrollArea className="h-screen w-full relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <section className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/50">
            <h1 className="text-3xl font-black text-foreground font-display">
              纪念日详情
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              在这里记录两个人的共同纪念时刻。
            </p>
          </section>

          <AnniversaryDetails />
        </div>
      </ScrollArea>
    </div>
  );
}
