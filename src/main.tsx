/**
 * 应用入口文件
 * 
 * 使用 React 19 的 createRoot API 渲染应用根组件
 * StrictMode 用于开发环境下检测潜在问题
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 挂载 React 应用到 DOM 根节点
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
