import FilterDrawer from '../../modules/countries/components/FilterDrawer'
import SearchInputWithFilter from '../../modules/countries/components/SearchInputWithFilter'
import React, { useState } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { useCountries } from '../../modules/countries/hooks/useCountries'
import FastImage from '@d11/react-native-fast-image'
import { useCountriesStore } from '../../modules/shared/store/countriesStore'
import LottieAnimation from '../../modules/shared/components/LottieAnimation'
import { loaderAnimation } from '../../assets/animations/loader'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { StackNavigationProp } from '@react-navigation/stack'
import { useFilteredCountries } from '../../modules/countries/hooks/useFilteredCountries'

type CountriesNavigationProp = StackNavigationProp<RootStackParamList, 'Countries'>

export default function CountriesPage() {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const { countries, search, selectedContinent, selectedCurrency, setSearch } = useCountriesStore()
  const { loading, error } = useCountries()
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const navigation = useNavigation<CountriesNavigationProp>()

  const filteredCountries = useFilteredCountries(countries, search, selectedContinent, selectedCurrency, loading, error)

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

  if (error)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error.message}</Text>
      </View>
    )

  return (
    <SafeAreaView className="flex-1 bg-white mt-8 mb-8">
      <View className="p-4">
        <Text className="text-4xl font-bold text-gray-800">¡Un mundo en tu mano!</Text>
        <Text className="text-lg text-gray-600 mt-4">
          Encuentra la información que necesitas sobre cada país en un solo lugar
        </Text>
      </View>

      <SearchInputWithFilter search={search} setSearch={setSearch} onFilterPress={() => setDrawerVisible(true)} />
      <FilterDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
      <FlatList
        data={filteredCountries}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-lg shadow-md mx-4 my-2 p-4 flex-row items-center"
            onPress={() => navigation.navigate('CountryDetail', { countryCode: item.code })}
            activeOpacity={0.8}
          >
            <FastImage
              source={{ uri: `https://flagcdn.com/48x36/${item.code.toLowerCase()}.png` }}
              style={{ width: 48, height: 36, borderRadius: 4, marginRight: 16 }}
            />
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-800 mb-1">{item.name}</Text>
              <Text className="text-sm text-gray-600">Código: {item.code}</Text>
              <Text className="text-sm text-gray-600">Continente: {item.continent.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
