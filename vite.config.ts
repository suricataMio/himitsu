/**
 * Vite 构建配置文件
 * 
 * 配置 React 项目的开发服务器和构建选项
 */
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // React 插件配置
    react({
      babel: {
        plugins: [
          // 自定义 Babel 插件：为 JSX 元素注入 data-source 属性
          // 用于 AI 代理定位源代码位置
          "./scripts/babel-plugin-jsx-source-location.cjs",
        ],
      },
    }),
    // Tailwind CSS 插件
    tailwindcss(),
  ],
  resolve: { 
    // 路径别名配置：@ 指向 src 目录
    alias: { "@": path.resolve(__dirname, "./src") } 
  },
  // 基础路径：使用相对路径，支持部署到子目录
  base: "./",
  build: { 
    // 输出目录
    outDir: "dist", 
    // 构建前清空输出目录
    emptyOutDir: true 
  },
});
