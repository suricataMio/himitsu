/**
 * 404 页面组件
 * 
 * 当用户访问不存在的路由时显示此页面
 * 提供友好的提示和返回首页的链接
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#FFFDF7]">
      {/* 装饰性房屋图标 */}
      <div className="text-6xl mb-4">🏠</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">这里什么都没有</h1>
      <p className="text-muted-foreground mb-6">你好像迷路了，快回家吧！</p>
      {/* 返回首页按钮 */}
      <a href="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity">
        返回首页
      </a>
    </div>
  );
}
