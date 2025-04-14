import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingPage from '../pages/onboarding/onboarding.page'
import CountriesPage from '../pages/countries/countries.page'
import CountryDetailPage from '../pages/countries-detail/countries-detail.page'

export type RootStackParamList = {
  Onboarding: undefined
  Countries: undefined
  CountryDetail: { countryCode: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingPage} options={{ headerShown: false }} />
      <Stack.Screen name="Countries" component={CountriesPage} options={{ headerShown: false }} />
      <Stack.Screen name="CountryDetail" component={CountryDetailPage} options={{ title: 'Detalles del país' }} />
    </Stack.Navigator>
  )
}

export default AppNavigator
