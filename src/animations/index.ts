// 动画类型定义
export type AnimationType = 'css' | 'js'

// 动画分类
export type AnimationCategory = 'entrance' | 'emphasis' | 'exit'

// 动画参数接口
export interface AnimationParams {
  duration: number
  element: HTMLElement
}

// CSS动画接口
export interface CSSAnimation {
  type: 'css'
  category: AnimationCategory
  name: string
  keyframes: Keyframe[]
  options?: KeyframeAnimationOptions
}

// JavaScript动画接口
export interface JSAnimation {
  type: 'js'
  category: AnimationCategory
  name: string
  animate: (params: AnimationParams) => void
}

// 统一动画类型
export type Animation = CSSAnimation | JSAnimation

// 缓动函数集合
export const easings = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}

// 生成随机数值
export const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

// 生成随机整数
export const randomInt = (min: number, max: number) => {
  return Math.floor(random(min, max))
}