# Animate-a-tron

[中文](README.md)

A feature-rich React animation component library that provides a series of smooth, easy-to-use animation effects, helping developers quickly implement elegant interface transitions and interactive effects.

## Features

- Rich Animation Types
  - Entrance Animations: bounce-in, fade-in, rotate-in
  - Emphasis Animations: shake, pulse, rotate-360
  - Exit Animations: fade-out, scale-out, slide-out

- Flexible Animation Configuration
  - Support for custom animation duration and easing functions
  - Multiple preset easing effects
  - Controllable animation fill mode

## Tech Stack

- React 18
- TypeScript
- Vite
- Web Animations API

## Development Environment Setup

This project uses Vite as the build tool, providing a fast development experience. Currently supports two official plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Uses SWC for Fast Refresh

## ESLint Configuration

If you're developing a production application, we recommend enabling type-aware linting rules:

1. Configure the top-level `parserOptions` property:

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

2. Update ESLint configuration:
- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install and configure [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react):

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