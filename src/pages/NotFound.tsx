export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#FFFDF7]">
      <div className="text-6xl mb-4">🏠</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">这里什么都没有</h1>
      <p className="text-muted-foreground mb-6">你好像迷路了，快回家吧！</p>
      <a href="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
        返回首页
      </a>
    </div>
  );
}
