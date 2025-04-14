import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from '@d11/react-native-fast-image'
import { PLACEHOLDER_IMAGE_URL, LOADING_GIF_URL } from '../constants/constants'
import { CountryHeaderPropsType } from '../types/HeaderPropsType'

export default function CountryHeader({
  countryName,
  emoji,
  imageUrl,
  imageLoading,
  imageError,
}: CountryHeaderPropsType) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  return (
    <View>
      <View className="relative px-4 py-2 mt-4">
        <FastImage
          source={{
            uri: imageUrl || PLACEHOLDER_IMAGE_URL,
            priority: FastImage.priority.normal,
          }}
          style={styles.countryImage}
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={() => setImageLoaded(false)}
          onLoadEnd={() => setImageLoaded(true)}
        />
        {(imageLoading || !imageLoaded) && (
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-gray-200">
            <FastImage
              source={{
                uri: LOADING_GIF_URL,
                priority: FastImage.priority.normal,
              }}
              style={styles.loadingImage}
            />
            <Text className="text-gray-800 text-lg">Cargando imagen...</Text>
          </View>
        )}
        {imageError && (
          <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-gray-200">
            <Text className="text-gray-800 text-lg">Error al cargar la imagen</Text>
          </View>
        )}
      </View>

      <View className="px-4 py-2">
        <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 flex-row items-center">
          <Text className="text-3xl mr-4">{emoji}</Text>
          <Text className="text-xl font-bold text-gray-800">{countryName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  countryImage: {
    height: 200,
    width: '100%',
    borderRadius: 12,
  },
  loadingImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
})
