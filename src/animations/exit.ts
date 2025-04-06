import { CSSAnimation, AnimationCategory, easings } from './index'

// 退出动画集合
export const exitAnimations: CSSAnimation[] = [
  {
    type: 'css',
    category: 'exit',
    name: 'fade-out',
    keyframes: [
      { opacity: '1', transform: 'translateY(0)', offset: 0 },
      { opacity: '0', transform: 'translateY(-20px)', offset: 1 }
    ],
    options: {
      easing: easings.easeIn,
      fill: 'forwards'
    }
  },
  {
    type: 'css',
    category: 'exit',
    name: 'scale-out',
    keyframes: [
      { transform: 'scale(1)', opacity: '1', offset: 0 },
      { transform: 'scale(0)', opacity: '0', offset: 1 }
    ],
    options: {
      easing: easings.easeIn,
      fill: 'forwards'
    }
  },
  {
    type: 'css',
    category: 'exit',
    name: 'slide-out',
    keyframes: [
      { 
        transform: 'translateX(0)',
        opacity: '1',
        offset: 0
      },
      {
        transform: 'translateX(100%)',
        opacity: '0',
        offset: 1
      }
    ],
    options: {
      easing: easings.easeInOut,
      fill: 'forwards'
    }
  }
]