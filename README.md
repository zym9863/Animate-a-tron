# Animate-a-tron

[English](README_EN.md)

一个功能丰富的React动画组件库，提供了一系列流畅、易用的动画效果，帮助开发者快速实现优雅的界面过渡和交互效果。

## 功能特点

- 丰富的动画类型
  - 入场动画：bounce-in（弹跳进入）、fade-in（淡入）、rotate-in（旋转进入）
  - 强调动画：shake（抖动）、pulse（脉冲）、rotate-360（旋转360度）
  - 退出动画：fade-out（淡出）、scale-out（缩放退出）、slide-out（滑出）

- 灵活的动画配置
  - 支持自定义动画时间和缓动函数
  - 提供多种预设的缓动效果
  - 可控的动画填充模式

## 技术栈

- React 18
- TypeScript
- Vite
- Web Animations API

## 开发环境配置

本项目使用Vite作为构建工具，提供了快速的开发体验。目前支持两个官方插件：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - 使用Babel实现Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - 使用SWC实现Fast Refresh

## ESLint配置

如果你正在开发生产应用，我们建议启用类型感知的lint规则：

1. 配置顶层的`parserOptions`属性：

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. 更新ESLint配置：
- 将`tseslint.configs.recommended`替换为`tseslint.configs.recommendedTypeChecked`或`tseslint.configs.strictTypeChecked`
- 可选添加`...tseslint.configs.stylisticTypeChecked`
- 安装并配置[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)：

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
