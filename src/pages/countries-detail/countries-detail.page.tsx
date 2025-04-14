import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/AppNavigator'

import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useCountryDetails } from '../../modules/countries-detail/hooks/useCountryDetails'
import { loaderAnimation } from '../../assets/animations/loader'
import LottieAnimation from '../../modules/shared/components/LottieAnimation'
import { useCountryImage } from '../../modules/countries-detail/hooks/useCountryImage'
import CountryHeader from '../../modules/countries-detail/components/CountryHeader'
import CountryInfoCard from '../../modules/countries-detail/components/CountryInfoCard'
import HLSPlayer from '../../modules/countries-detail/components/HLSPlayer'
import VideoPlayer from '../../modules/countries-detail/components/VideoPlayer'

export default function CountryDetailPage() {
  const route = useRoute<RouteProp<RootStackParamList, 'CountryDetail'>>()
  const { countryCode } = route.params
  const { country, loading, error } = useCountryDetails(countryCode)
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const { imageUrl, loading: imageLoading, error: imageError } = useCountryImage(country?.name || '')

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <LottieAnimation
          source={loaderAnimation}
          style={{
            width: screenWidth,
            height: screenHeight,
            position: 'absolute',
          }}
          autoPlay={true}
          loop={false}
          repeatCount={1}
        />
      </View>
    )

  if (error || !country) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error?.message || 'No se encontraron datos'}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CountryHeader
          countryName={country.name}
          emoji={country.emoji}
          imageUrl={imageUrl}
          imageLoading={imageLoading}
          imageError={imageError}
        />

        <View className="px-4 py-4">
          <CountryInfoCard title="Información Básica">
            <Text className="text-gray-600 mb-1">
              <Text className="font-semibold">Código: </Text>
              {country.code}
            </Text>
            <Text className="text-gray-600 mb-1">
              <Text className="font-semibold">Continente: </Text>
              {country.continent.name}
            </Text>
            <Text className="text-gray-600 mb-1">
              <Text className="font-semibold">Capital: </Text>
              {country.capital || 'N/A'}
            </Text>
            <Text className="text-gray-600">
              <Text className="font-semibold">Moneda: </Text>
              {country.currency || 'N/A'}
            </Text>
          </CountryInfoCard>

          <CountryInfoCard title="Idiomas">
            {country.languages.length > 0 ? (
              country.languages.map((language, index) => (
                <Text key={index} className="text-gray-600 mb-1">
                  {language.name} ({language.code})
                </Text>
              ))
            ) : (
              <Text className="text-gray-600">No hay idiomas disponibles</Text>
            )}
          </CountryInfoCard>

          <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 mb-4">
            <Text className="text-lg font-bold text-gray-800 mb-2">Información Adicional</Text>
            <Text className="text-gray-600">
              <Text className="font-semibold">Código Telefónico: </Text>+ {country.phone || 'N/A'}
            </Text>
          </TouchableOpacity>

          <CountryInfoCard title="Video con HLS.js:">
            <HLSPlayer />
          </CountryInfoCard>

          <CountryInfoCard title="Video con ReactNative-Video:">
            <VideoPlayer />
          </CountryInfoCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  countryImage: {
    height: 200,
    width: '100%',
  },
})
