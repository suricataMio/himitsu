/**
 * 通用工具函数模块
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 CSS 类名工具函数
 * 
 * 结合 clsx 和 tailwind-merge 的功能：
 * - clsx: 条件性地合并类名
 * - twMerge: 智能合并 Tailwind CSS 类，解决类名冲突
 * 
 * @param inputs - 类名参数，支持字符串、数组、对象等格式
 * @returns 合并后的类名字符串
 * 
 * @example
 * cn("px-4 py-2", condition && "bg-blue-500", { "text-white": isActive })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
