import { CSSAnimation, easings } from './index'

// 强调动画集合
export const emphasisAnimations: CSSAnimation[] = [
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
  }
]