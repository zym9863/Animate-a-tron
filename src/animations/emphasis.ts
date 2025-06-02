import { CSSAnimation, JSAnimation, easings, AnimationParams } from './index'

// JavaScript动画实现
const jsShakeAnimation = (params: AnimationParams) => {
  const { element, duration } = params
  const startTime = performance.now()
  let animationId: number
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    if (progress < 1) {
      const shake = Math.sin(progress * Math.PI * 8) * 10 * (1 - progress)
      element.style.transform = `translateX(${shake}px)`
      animationId = requestAnimationFrame(animate)
    } else {
      element.style.transform = 'translateX(0px)'
      // 确保动画结束后移除样式
      cancelAnimationFrame(animationId)
    }
  }
  
  animationId = requestAnimationFrame(animate)
  
  // 添加超时保护，确保动画一定会结束
  setTimeout(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      element.style.transform = 'translateX(0px)'
    }
  }, duration + 100)
}

const jsPulseAnimation = (params: AnimationParams) => {
  const { element, duration } = params
  const startTime = performance.now()
  let animationId: number
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    if (progress < 1) {
      const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.1
      element.style.transform = `scale(${scale})`
      animationId = requestAnimationFrame(animate)
    } else {
      element.style.transform = 'scale(1)'
      cancelAnimationFrame(animationId)
    }
  }
  
  animationId = requestAnimationFrame(animate)
  
  // 添加超时保护
  setTimeout(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      element.style.transform = 'scale(1)'
    }
  }, duration + 100)
}

const jsRotateAnimation = (params: AnimationParams) => {
  const { element, duration } = params
  const startTime = performance.now()
  let animationId: number
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    if (progress < 1) {
      const rotation = progress * 360
      element.style.transform = `rotate(${rotation}deg)`
      animationId = requestAnimationFrame(animate)
    } else {
      element.style.transform = 'rotate(0deg)'
      cancelAnimationFrame(animationId)
    }
  }
  
  animationId = requestAnimationFrame(animate)
  
  // 添加超时保护
  setTimeout(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      element.style.transform = 'rotate(0deg)'
    }
  }, duration + 100)
}

// 强调动画集合
export const emphasisAnimations: (CSSAnimation | JSAnimation)[] = [
  {
    type: 'css',
    category: 'emphasis',
    name: 'shake',
    keyframes: [
      { transform: 'translateX(0)', offset: 0 },
      { transform: 'translateX(-10px)', offset: 0.2 },
      { transform: 'translateX(10px)', offset: 0.4 },
      { transform: 'translateX(-10px)', offset: 0.6 },
      { transform: 'translateX(10px)', offset: 0.8 },
      { transform: 'translateX(0)', offset: 1 }
    ],
    options: {
      easing: easings.easeInOut,
      fill: 'forwards'
    }
  },
  {
    type: 'css',
    category: 'emphasis',
    name: 'pulse',
    keyframes: [
      { transform: 'scale(1)', offset: 0 },
      { transform: 'scale(1.1)', offset: 0.5 },
      { transform: 'scale(1)', offset: 1 }
    ],
    options: {
      easing: easings.easeInOut,
      fill: 'forwards'
    }
  },
  {
    type: 'css',
    category: 'emphasis',
    name: 'rotate-360',
    keyframes: [
      { transform: 'rotate(0deg)', offset: 0 },
      { transform: 'rotate(360deg)', offset: 1 }
    ],
    options: {
      easing: easings.easeInOut,
      fill: 'forwards'
    }
  },
  // JavaScript 动画
  {
    type: 'js',
    category: 'emphasis',
    name: 'js-shake',
    animate: jsShakeAnimation
  },
  {
    type: 'js',
    category: 'emphasis',
    name: 'js-pulse',
    animate: jsPulseAnimation
  },
  {
    type: 'js',
    category: 'emphasis',
    name: 'js-rotate',
    animate: jsRotateAnimation
  }
]
