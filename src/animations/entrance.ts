import { CSSAnimation, AnimationCategory, easings } from './index'

// 入场动画集合
export const entranceAnimations: CSSAnimation[] = [
  {
    type: 'css',
    category: 'entrance',
    name: 'bounce-in',
    keyframes: [
      { transform: 'scale(0)', opacity: '0', offset: 0 },
      { transform: 'scale(1.2)', opacity: '0.5', offset: 0.5 },
      { transform: 'scale(1)', opacity: '1', offset: 1 }
    ],
    options: {
      easing: easings.bounce,
      fill: 'forwards'
    }
  },
  {
    type: 'css',
    category: 'entrance',
    name: 'fade-in',
    keyframes: [
      { opacity: '0', transform: 'translateY(20px)', offset: 0 },
      { opacity: '1', transform: 'translateY(0)', offset: 1 }
    ],
    options: {
      easing: easings.easeOut,
      fill: 'forwards'
    }
  },
  {
    type: 'css',
    category: 'entrance',
    name: 'rotate-in',
    keyframes: [
      { 
        transform: 'perspective(400px) rotateX(-90deg)',
        opacity: '0',
        offset: 0
      },
      {
        transform: 'perspective(400px) rotateX(0deg)',
        opacity: '1',
        offset: 1
      }
    ],
    options: {
      easing: easings.easeInOut,
      fill: 'forwards'
    }
  }
]