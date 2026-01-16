/**
 * 猫咪详情页
 *
 * 点击首页猫咪卡片后进入，展示该猫咪的完整记录。
 */
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

import { CatCareDashboard, catProfiles, type CatId } from "@/components/home/CatCareDashboard";
import { HomeBackground } from "@/components/home/HomeBackground";
import { ScrollArea } from "@/components/ui/scroll-area";

type CatProfileProps = {
  params?: {
    catId?: string;
  };
};

export default function CatProfile({ params }: CatProfileProps) {
  const rawId = params?.catId;
  const catId: CatId = rawId === "cake" ? "cake" : "sweet";
  const cat = catProfiles[catId];

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-20 overflow-hidden">
      <HomeBackground />
      <ScrollArea className="h-screen w-full relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-foreground font-display">
                  {cat.name}的日常记录
                </h1>
                <p className="text-sm text-muted-foreground">体重、趋势与状态集中查看</p>
              </div>
            </div>
          </div>

          <CatCareDashboard catId={catId} />
        </div>
      </ScrollArea>
    </div>
  );
}
