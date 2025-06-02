import { useState, useEffect, useRef } from 'react'
import './App.css'
import { entranceAnimations } from './animations/entrance'
import { emphasisAnimations } from './animations/emphasis'
import { exitAnimations } from './animations/exit'

function App() {
  const [animationType, setAnimationType] = useState('css')
  const [duration, setDuration] = useState(1)
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [lastAnimation, setLastAnimation] = useState<string>('')
  const [animationCount, setAnimationCount] = useState(0)
  
  // 使用 ref 来跟踪当前动画和超时
  const currentAnimationRef = useRef<Animation | null>(null)
  const currentTimeoutRef = useRef<number | null>(null)
  const isJSAnimatingRef = useRef<boolean>(false)

  // 清理函数
  const cleanupAnimation = () => {
    // 停止CSS动画
    if (currentAnimationRef.current) {
      currentAnimationRef.current.cancel()
      currentAnimationRef.current = null
    }
    
    // 清除超时
    if (currentTimeoutRef.current) {
      clearTimeout(currentTimeoutRef.current)
      currentTimeoutRef.current = null
    }
    
    // 重置JavaScript动画状态
    isJSAnimatingRef.current = false
    
    // 重置元素样式
    if (previewElement) {
      previewElement.style.transform = ''
      previewElement.style.opacity = ''
    }
    
    setIsAnimating(false)
  }

  // 添加键盘快捷键支持
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isAnimating) {
        event.preventDefault()
        handleGenerateAnimation()
      }
      // 按ESC键停止当前动画
      if (event.code === 'Escape' && isAnimating) {
        event.preventDefault()
        cleanupAnimation()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAnimating])

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanupAnimation()
    }
  }, [])

  const handleGenerateAnimation = () => {
    if (!previewElement) return

    // 先清理之前的动画
    cleanupAnimation()

    setIsAnimating(true)
    setAnimationCount((prev: number) => prev + 1)

    // 获取所有动画
    const allAnimations = [
      ...entranceAnimations,
      ...emphasisAnimations,
      ...exitAnimations
    ].filter(animation => animation.type === animationType)

    // 随机选择一个动画
    const selectedAnimation = allAnimations[Math.floor(Math.random() * allAnimations.length)]

    if (!selectedAnimation) {
      setIsAnimating(false)
      return
    }

    setLastAnimation(`${selectedAnimation.category} - ${selectedAnimation.name || '未命名'}`)

    // 如果是CSS动画
    if (selectedAnimation.type === 'css') {
      const animation = previewElement.animate(
        selectedAnimation.keyframes,
        {
          ...selectedAnimation.options,
          duration: duration * 1000 // 转换为毫秒
        }
      )

      currentAnimationRef.current = animation

      // 动画结束后重置
      animation.onfinish = () => {
        setIsAnimating(false)
        currentAnimationRef.current = null
        
        if (selectedAnimation.category === 'exit') {
          // 如果是退出动画，完成后重置元素状态
          currentTimeoutRef.current = setTimeout(() => {
            if (previewElement) {
              const resetAnimation = previewElement.animate(
                [
                  { opacity: '0', transform: 'none' },
                  { opacity: '1', transform: 'none' }
                ],
                {
                  duration: 0,
                  fill: 'forwards'
                }
              )
              resetAnimation.onfinish = () => {
                currentTimeoutRef.current = null
              }
            }
          }, 100)
        }
      }

      // 动画被取消时的处理
      animation.oncancel = () => {
        setIsAnimating(false)
        currentAnimationRef.current = null
      }
    }
    // 如果是JS动画
    else if (selectedAnimation.type === 'js' && 'animate' in selectedAnimation) {
      isJSAnimatingRef.current = true
      
      try {
        (selectedAnimation as { animate: Function }).animate({
          element: previewElement,
          duration: duration * 1000
        })
      } catch (error) {
        console.error('JavaScript动画执行错误:', error)
        setIsAnimating(false)
        isJSAnimatingRef.current = false
        return
      }
      
      // 设置超时来确保动画结束
      currentTimeoutRef.current = setTimeout(() => {
        if (isJSAnimatingRef.current) {
          setIsAnimating(false)
          isJSAnimatingRef.current = false
          // 重置元素样式
          if (previewElement) {
            previewElement.style.transform = ''
          }
        }
        currentTimeoutRef.current = null
      }, duration * 1000 + 100) // 多加100ms作为缓冲
    }
  }

  const handleAnimationTypeChange = (type: string) => {
    // 切换动画类型时，先停止当前动画
    cleanupAnimation()
    setAnimationType(type)
  }

  return (
    <div className="app-container">
      {/* 头部标题 */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">✨</span>
            Animate-a-tron
          </h1>
          <p className="app-subtitle">强大的动画生成器 - 让创意动起来</p>
        </div>
        <div className="stats-panel">
          <div className="stat-item">
            <span className="stat-number">{animationCount}</span>
            <span className="stat-label">生成次数</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{duration}s</span>
            <span className="stat-label">动画时长</span>
          </div>
        </div>
      </header>

      {/* 预览区域 */}
      <div className="preview-section">
        <div className="preview-wrapper">
          <div 
            ref={setPreviewElement}
            className={`preview-box ${isAnimating ? 'animating' : ''}`}
          >
            <div className="preview-content">
              <img src="/animation-concept-1.png" alt="Animation Concept 1" className="preview-image" />
              <img src="/motion-graphics-2.png" alt="Motion Graphics 2" className="preview-image" />
            </div>
          </div>
          <div className="preview-overlay">
            <div className="preview-grid"></div>
          </div>
        </div>
        
        {/* 动画信息显示 */}
        {lastAnimation && (
          <div className="animation-info">
            <span className="info-label">上次动画:</span>
            <span className="info-value">{lastAnimation}</span>
          </div>
        )}
      </div>

      {/* 控制面板 */}
      <div className="control-panel">
        <div className="panel-header">
          <h3>动画控制</h3>
          <div className="keyboard-hint">
            <span>按 <kbd>空格键</kbd> 生成 | <kbd>ESC</kbd> 停止</span>
          </div>
        </div>

        <div className="control-grid">
          <div className="control-group">
            <label className="control-label">动画引擎</label>
            <div className="radio-group">
              <label className={`radio-option ${animationType === 'css' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="animationType"
                  value="css"
                  checked={animationType === 'css'}
                  onChange={() => handleAnimationTypeChange('css')}
                />
                <span className="radio-custom"></span>
                <span className="radio-text">CSS Animations</span>
                <span className="radio-badge">推荐</span>
              </label>
              <label className={`radio-option ${animationType === 'js' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="animationType"
                  value="js"
                  checked={animationType === 'js'}
                  onChange={() => handleAnimationTypeChange('js')}
                />
                <span className="radio-custom"></span>
                <span className="radio-text">JavaScript</span>
              </label>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">
              动画时长
              <span className="duration-display">{duration}秒</span>
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={duration}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(parseFloat(e.target.value))}
                className="duration-slider"
              />
              <div className="slider-markers">
                <span>0.1s</span>
                <span>1.5s</span>
                <span>3s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button 
            className={`generate-button ${isAnimating ? 'animating' : ''}`}
            onClick={handleGenerateAnimation}
            disabled={isAnimating}
          >
            <span className="button-icon">🎯</span>
            <span className="button-text">
              {isAnimating ? '动画进行中...' : '生成随机动画'}
            </span>
            {isAnimating && <div className="button-loader"></div>}
          </button>
          
          {isAnimating && (
            <button 
              className="stop-button"
              onClick={cleanupAnimation}
            >
              <span className="button-icon">⏹️</span>
              <span className="button-text">停止动画</span>
            </button>
          )}
        </div>
      </div>

      {/* 底部信息 */}
      <footer className="app-footer">
        <p>使用 React + TypeScript + Vite 构建</p>
      </footer>
    </div>
  )
}

export default App
