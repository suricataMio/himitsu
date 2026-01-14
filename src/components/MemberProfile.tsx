/**
 * 成员档案组件
 * 
 * 展示公会成员的头像、名称和角色
 * 支持自定义背景色和悬停动画效果
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/** 成员档案组件属性 */
interface MemberProps {
  /** 成员名称 */
  name: string;
  /** 成员角色/职位 */
  role: string;
  /** 头像图片路径 */
  imageSrc: string;
  /** 背景颜色类名（可选，默认为主题色） */
  color?: string;
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
export function MemberProfile({ name, role, imageSrc, color = "bg-primary/20" }: MemberProps) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      {/* 头像容器 - 带悬停放大旋转效果 */}
      <div className={`p-1.5 rounded-full ${color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg ring-4 ring-white/50`}>
        <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
          <AvatarImage src={imageSrc} alt={name} className="object-cover" />
          {/* 头像加载失败时的占位符 */}
          <AvatarFallback className="bg-white text-muted-foreground font-bold">{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      {/* 成员信息 */}
      <div className="text-center space-y-0.5">
        <h3 className="font-bold text-foreground font-display text-base group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-white/50 inline-block">{role}</p>
      </div>
    </div>
  );
}
