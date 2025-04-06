import { useState} from 'react'
import './App.css'
import { entranceAnimations } from './animations/entrance'
import { emphasisAnimations } from './animations/emphasis'
import { exitAnimations } from './animations/exit'

function App() {
  const [animationType, setAnimationType] = useState('css')
  const [duration, setDuration] = useState(1)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleGenerateAnimation = () => {
    if (!previewElement) return

    setIsAnimating(true)

    // 获取所有动画
    const allAnimations = [
      ...entranceAnimations,
      ...emphasisAnimations,
      ...exitAnimations
    ].filter(animation => animation.type === animationType)

    // 随机选择一个动画
    const selectedAnimation = allAnimations[Math.floor(Math.random() * allAnimations.length)]

    if (!selectedAnimation) return

    // 如果是CSS动画
    if (selectedAnimation.type === 'css') {
      const animation = previewElement.animate(
        selectedAnimation.keyframes,
        {
          ...selectedAnimation.options,
          duration: duration * 1000 // 转换为毫秒
        }
      )

      // 动画结束后重置
      animation.onfinish = () => {
        setIsAnimating(false)
        if (selectedAnimation.category === 'exit') {
          // 如果是退出动画，完成后重置元素状态
          setTimeout(() => {
            previewElement.animate(
              [
                { opacity: '0', transform: 'none' },
                { opacity: '1', transform: 'none' }
              ],
              {
                duration: 0,
                fill: 'forwards'
              }
            )
          }, 100)
        }
      }
    }
    // 如果是JS动画
    else if (selectedAnimation.type === 'js' && 'animate' in selectedAnimation) {
      (selectedAnimation as { animate: Function }).animate({
        element: previewElement,
        duration: duration * 1000
      })
      // 动画结束后重置状态
      setTimeout(() => setIsAnimating(false), duration * 1000)
    }
  }

  return (
    <div className="app-container">
      <div className="preview-section">
        <div 
          ref={setPreviewElement}
          className={`preview-box ${isAnimating ? 'animating' : ''}`}
        >
          <img src="src/assets/animation-concept-1.png" alt="Animation Concept 1" className="preview-image" />
          <img src="src/assets/motion-graphics-2.png" alt="Motion Graphics 2" className="preview-image" />
        </div>
      </div>

      <div className="control-panel">
        <div className="control-group">
          <label>动画类型：</label>
          <label>
            <input
              type="checkbox"
              checked={animationType === 'css'}
              onChange={() => setAnimationType('css')}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              checked={animationType === 'js'}
              onChange={() => setAnimationType('js')}
            />
            JavaScript
          </label>
        </div>

        <div className="control-group">
          <label>动画时长：</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
          />
          <span>{duration}秒</span>
        </div>

        <button 
          className="generate-button"
          onClick={handleGenerateAnimation}
          disabled={isAnimating}
        >
          {isAnimating ? '动画进行中...' : '生成随机动画'}
        </button>
      </div>
    </div>
  )
}

export default App
