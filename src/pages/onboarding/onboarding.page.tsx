import React, { useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { onboardingAnimation } from '../../assets/animations/onBoarding'
import LottieAnimation from '../../modules/shared/components/LottieAnimation'

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function OnboardingPage() {
  const navigation = useNavigation<OnboardingNavigationProp>()
  const handleAnimationEnd = useCallback(() => {
    navigation.replace('Countries')
  }, [navigation])

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <LottieAnimation
        source={onboardingAnimation}
        style={{
          width: screenWidth,
          height: screenHeight,
          position: 'absolute',
        }}
        autoPlay={true}
        loop={false}
        repeatCount={1}
        onAnimationEnd={handleAnimationEnd}
      />
    </View>
  )
}
