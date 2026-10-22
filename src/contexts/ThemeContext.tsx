/**
 * 主题上下文模块
 * 
 * 提供全局主题管理功能：
 * - 支持明暗主题切换
 * - 通过 Context 在组件树中共享主题状态
 * - 自动将主题类名应用到 document.documentElement
 */
import * as React from "react";

/** 主题类型：亮色 | 暗色 */
type Theme = "light" | "dark";

/** 主题上下文类型定义 */
interface ThemeContextType {
  /** 当前主题 */
  theme: Theme;
  /** 切换主题的方法 */
  toggleTheme: () => void;
}

// 创建主题上下文
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

/** ThemeProvider 组件属性 */
interface ThemeProviderProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 默认主题，默认为 "light" */
  defaultTheme?: Theme;
  /** 是否允许切换主题，默认为 false */
  switchable?: boolean;
  /** 是否根据时间自动切换主题，默认为 true */
  autoTheme?: boolean;
}

function getTimeBasedTheme(now: Date = new Date()): Theme {
  const hour = now.getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

function getNextThemeChange(now: Date = new Date()): Date {
  const next = new Date(now);
  const hour = now.getHours();

  if (hour < 6) {
    next.setHours(6, 0, 0, 0);
    return next;
  }

  if (hour < 18) {
    next.setHours(18, 0, 0, 0);
    return next;
  }

  next.setDate(next.getDate() + 1);
  next.setHours(6, 0, 0, 0);
  return next;
}

/**
 * 主题提供者组件
 * 
 * 包裹应用根组件，提供主题上下文
 * 
 * @param props - 组件属性
 * @param props.children - 子组件
 * @param props.defaultTheme - 默认主题
 * @param props.switchable - 是否允许切换主题
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
  autoTheme = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() =>
    autoTheme && !switchable ? getTimeBasedTheme() : defaultTheme,
  );

  // 当主题变化时，更新 HTML 根元素的类名
  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  React.useEffect(() => {
    if (!autoTheme || switchable) {
      return undefined;
    }

    let timeoutId: number | undefined;

    const scheduleNext = () => {
      setTheme(getTimeBasedTheme());
      const now = new Date();
      const nextChange = getNextThemeChange(now);
      const delay = Math.max(nextChange.getTime() - now.getTime(), 0);
      timeoutId = window.setTimeout(scheduleNext, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [autoTheme, switchable]);

  /**
   * 切换主题
   * 仅在 switchable 为 true 时生效
   */
  const toggleTheme = () => {
    if (switchable) {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 主题 Hook
 * 
 * 在组件中使用此 Hook 获取当前主题和切换方法
 * 必须在 ThemeProvider 内部使用
 * 
 * @returns 主题上下文对象 { theme, toggleTheme }
 * @throws 如果不在 ThemeProvider 内部使用则抛出错误
 * 
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme 必须在 ThemeProvider 内部使用");
  }
  return context;
}
