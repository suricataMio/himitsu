/**
 * 移动端检测 Hook
 * 
 * 监听视口宽度变化，判断当前是否为移动端设备
 * 使用 matchMedia API 实现响应式检测
 */
import * as React from "react"

/** 移动端断点宽度（像素） */
const MOBILE_BREAKPOINT = 768

/**
 * 检测是否为移动端设备
 * 
 * 根据视口宽度判断，小于 768px 被认为是移动端
 * 会自动监听窗口大小变化并更新状态
 * 
 * @returns 是否为移动端设备
 * 
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // 移动端逻辑
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // 创建媒体查询监听器
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // 视口变化时的处理函数
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // 添加监听器
    mql.addEventListener("change", onChange)
    
    // 初始化状态
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // 清理：移除监听器
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
