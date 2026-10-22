/**
 * 首页底部组件
 *
 * 显示版权信息和起始日期：
 * - 动态年份版权声明
 * - 公会成立日期 2021.01.01
 */
export function HomeFooter() {
  return (
    <footer className="text-center py-8 text-sm text-muted-foreground/60">
      <p>© {new Date().getFullYear()} Family Guild. Mission Start: 2021.01.01</p>
    </footer>
  );
}
