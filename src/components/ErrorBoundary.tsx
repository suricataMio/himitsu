/**
 * 错误边界组件
 * 
 * React 错误边界，用于捕获子组件树中的 JavaScript 错误
 * 防止整个应用崩溃，并显示友好的错误提示
 * 
 * 使用方式：包裹在可能出错的组件外层
 * <ErrorBoundary fallback={<CustomError />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
import * as React from "react";

/** 组件属性 */
interface Props {
  /** 子组件 */
  children: React.ReactNode;
  /** 发生错误时显示的备用 UI（可选） */
  fallback?: React.ReactNode;
}

/** 组件状态 */
interface State {
  /** 是否发生错误 */
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * 静态方法：从错误中派生状态
   * 当子组件抛出错误时，此方法会被调用
   */
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    // 如果发生错误，显示备用 UI
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          // 默认错误提示界面
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">出错了</h1>
              {/* 刷新页面按钮 */}
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                刷新页面
              </button>
            </div>
          </div>
        )
      );
    }
    // 正常情况下渲染子组件
    return this.props.children;
  }
}
