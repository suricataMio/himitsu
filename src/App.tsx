/**
 * 应用根组件
 * 
 * 负责整合全局 Provider 和路由配置：
 * - ErrorBoundary: 全局错误边界，捕获渲染错误
 * - ThemeProvider: 主题上下文，管理明暗主题切换
 * - TooltipProvider: 工具提示上下文
 * - Router: 基于 Hash 的路由，支持 file:// 协议直接打开
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import CatProfile from "@/pages/CatProfile";
import Home from "@/pages/Home";
import AnniversaryPage from "@/pages/AnniversaryPage";
import MemberProfilePage from "@/pages/MemberProfilePage";
import NotFound from "@/pages/NotFound";

/**
 * 应用路由组件
 * 
 * 使用基于 Hash 的路由 (/#/)，这样可以支持通过 file:// 协议
 * 直接打开 index.html 文件，无需服务器支持
 */
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/anniversary" component={AnniversaryPage} />
        <Route path="/cat/:catId" component={CatProfile} />
        <Route path="/member/:memberId" component={MemberProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

/**
 * 主题配置说明：
 * - 根据设计选择 defaultTheme（亮色或暗色背景）
 * - 在 index.css 中更新对应的颜色配置
 * - 如需支持主题切换，添加 switchable 属性并使用 useTheme hook
 */

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
