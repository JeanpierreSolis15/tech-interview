import React, { useEffect, useRef, useState } from 'react'
import LottieView, { LottieViewProps } from 'lottie-react-native'
import { StyleProp, ViewStyle } from 'react-native'

type LottieSource = LottieViewProps['source']

interface LottieAnimationProps {
  source: LottieSource
  style: StyleProp<ViewStyle>
  autoPlay?: boolean
  loop?: boolean
  duration?: number
  onAnimationEnd?: () => void
  repeatCount?: number
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  style,
  autoPlay = true,
  loop = false,
  onAnimationEnd,
  repeatCount = 0,
}) => {
  const animationRef = useRef<LottieView>(null)
  const [, setCurrentLoop] = useState(0)

  const handleAnimationFinish = () => {
    if (loop) {
      return
    }

    setCurrentLoop(prev => {
      const newLoopCount = prev + 1
      if (newLoopCount >= repeatCount) {
        if (onAnimationEnd) {
          onAnimationEnd()
        }
        return newLoopCount
      }
      animationRef.current?.play()
      return newLoopCount
    })
  }

  useEffect(() => {
    if (autoPlay) {
      animationRef.current?.play()
    }
  }, [autoPlay])

  return (
    <LottieView
      ref={animationRef}
      source={source}
      style={style}
      autoPlay={false}
      loop={false}
      onAnimationFinish={handleAnimationFinish}
    />
  )
}

export default LottieAnimation
