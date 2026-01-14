import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberProps {
  name: string;
  role: string;
  imageSrc: string;
  color?: string;
}

export function MemberProfile({ name, role, imageSrc, color = "bg-primary/20" }: MemberProps) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className={`p-1.5 rounded-full ${color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg ring-4 ring-white/50`}>
        <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
          <AvatarImage src={imageSrc} alt={name} className="object-cover" />
          <AvatarFallback className="bg-white text-muted-foreground font-bold">{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center space-y-0.5">
        <h3 className="font-bold text-foreground font-display text-base group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-white/50 inline-block">{role}</p>
      </div>
    </div>
  );
}
