/**
 * 成员档案组件
 * 
 * 展示公会成员的头像、名称和角色
 * 支持自定义背景色和悬停动画效果
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type StatusTone = "ok" | "soon" | "due";

interface StatusItem {
  label: string;
  value: string;
  progress: number;
  tone: StatusTone;
}

/** 成员档案组件属性 */
interface MemberProps {
  /** 成员名称 */
  name: string;
  /** 成员角色/职位 */
  role?: string;
  /** 头像图片路径 */
  imageSrc: string;
  /** 背景颜色类名（可选，默认为主题色） */
  color?: string;
  /** 猫咪状态栏信息（可选） */
  statusItems?: StatusItem[];
  /** 卡片自定义样式 */
  className?: string;
  /** 紧凑尺寸 */
  size?: "default" | "compact";
}

/**
 * 成员档案卡片
 * 
 * @param props - 组件属性
 * @param props.name - 成员名称
 * @param props.role - 成员角色
 * @param props.imageSrc - 头像图片
 * @param props.color - 背景色 Tailwind 类名
 */
const statusToneStyles: Record<StatusTone, { badge: string; bar: string }> = {
  ok: {
    badge: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-400",
  },
  soon: {
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-amber-400",
  },
  due: {
    badge: "bg-rose-100 text-rose-700",
    bar: "bg-rose-400",
  },
};

export function MemberProfile({
  name,
  role,
  imageSrc,
  color = "bg-primary/20",
  statusItems,
  className,
  size = "default",
}: MemberProps) {
  const isCompact = size === "compact";

  return (
    <div
      className={cn(
        "flex flex-col items-center group cursor-pointer",
        isCompact ? "gap-2" : "gap-3",
        className
      )}
    >
      {/* 头像容器 - 带悬停放大旋转效果 */}
      <div
        className={cn(
          "rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg ring-4 ring-white/50",
          isCompact ? "p-1" : "p-1.5",
          color
        )}
      >
        <Avatar className={cn("border-4 border-white shadow-sm", isCompact ? "w-16 h-16" : "w-24 h-24")}>
          <AvatarImage src={imageSrc} alt={name} className="object-cover" />
          {/* 头像加载失败时的占位符 */}
          <AvatarFallback className="bg-white text-muted-foreground font-bold">{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      {/* 成员信息 */}
      <div className="text-center space-y-0.5">
        <h3
          className={cn(
            "font-bold text-foreground font-display group-hover:text-primary transition-colors",
            isCompact ? "text-sm" : "text-base"
          )}
        >
          {name}
        </h3>
        {role ? (
          <p className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-white/50 inline-block">
            {role}
          </p>
        ) : null}
      </div>
      {statusItems && statusItems.length > 0 ? (
        <div className="w-full max-w-[200px] rounded-2xl border border-white/80 bg-white/70 px-3 py-2 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
            <span>状态栏</span>
            <span>提醒</span>
          </div>
          <div className="mt-2 space-y-2">
            {statusItems.map((item) => {
              const tone = statusToneStyles[item.tone];
              return (
                <div key={`${name}-${item.label}`} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-foreground/80">{item.label}</span>
                    <span className={cn("rounded-full px-2 py-0.5 font-semibold", tone.badge)}>
                      {item.value}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
                    <div
                      className={cn("h-full rounded-full transition-all", tone.bar)}
                      style={{ width: `${Math.min(Math.max(item.progress, 0), 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
