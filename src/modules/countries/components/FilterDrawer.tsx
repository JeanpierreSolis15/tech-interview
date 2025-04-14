import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { Text, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dropdown } from 'react-native-element-dropdown'
import { useCountriesStore } from '../../shared/store/countriesStore'

interface FilterDrawerProps {
  visible: boolean
  onClose: () => void
}

export default function FilterDrawer({ visible, onClose }: FilterDrawerProps) {
  const { width } = Dimensions.get('window')
  const drawerWidth = width * 0.75
  const translateX = React.useRef(new Animated.Value(width)).current

  const { continents, currencies, selectedContinent, setSelectedContinent, selectedCurrency, setSelectedCurrency } =
    useCountriesStore()

  const [tempContinent, setTempContinent] = useState<string>(selectedContinent || 'Todos los Continentes')
  const [tempCurrency, setTempCurrency] = useState<string>(selectedCurrency || 'Todas las Monedas')

  useEffect(() => {
    if (visible) {
      setTempContinent(selectedContinent || 'Todos los Continentes')
      setTempCurrency(selectedCurrency || 'Todas las Monedas')
    }
  }, [visible, selectedContinent, selectedCurrency])

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [visible, translateX, width])

  const applyFilters = () => {
    setSelectedContinent(tempContinent)
    setSelectedCurrency(tempCurrency)
    onClose()
  }

  const clearFilters = () => {
    setTempContinent('Todos los Continentes')
    setTempCurrency('Todas las Monedas')
  }

  return (
    <>
      {visible && (
        <TouchableOpacity
          className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500/50 z-[1000]"
          // style={{ zIndex: 1000 }}
          onPress={onClose}
        />
      )}
      <Animated.View
        className="absolute top-0 right-0 bottom-0 bg-white shadow-lg z-[1001]"
        style={{
          width: drawerWidth,
          transform: [{ translateX }],
          // zIndex: 1001
        }}
      >
        <View className="flex-1 p-4  mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              {/* Se agrega style, porque al darle la clase, da error en el tipado del icono className="mr-2" */}
              <Icon name="filter" size={20} color="#3B82F6" style={{ marginRight: 8 }} />
              <Text className="text-lg font-semibold text-gray-800">Filtros</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-500 mb-4">Selecciona filtros para limitar tu búsqueda</Text>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Continente</Text>
            <Dropdown
              data={continents.map(c => ({ label: c, value: c }))}
              labelField="label"
              valueField="value"
              value={tempContinent}
              onChange={item => setTempContinent(item.value)}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5dc',
                borderRadius: 12,
                padding: 10,
                backgroundColor: 'white',
              }}
              containerStyle={{
                borderRadius: 12,
                backgroundColor: 'white',
                marginTop: 2,
              }}
              itemTextStyle={{ color: '#6B7280' }}
              selectedTextStyle={{ color: '#6B7280' }}
              placeholder="Selecciona un continente"
              placeholderStyle={{ color: '#6B7280' }}
              iconColor="#6B7280"
              autoScroll={false}
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 mb-2">Moneda</Text>
            <Dropdown
              data={currencies.map(c => ({ label: c, value: c }))}
              labelField="label"
              valueField="value"
              value={tempCurrency}
              onChange={item => setTempCurrency(item.value)}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5dc',
                borderRadius: 12,
                padding: 10,
                backgroundColor: 'white',
              }}
              containerStyle={{
                borderRadius: 12,
                backgroundColor: 'white',
                marginTop: 2,
              }}
              itemTextStyle={{ color: '#6B7280' }}
              selectedTextStyle={{ color: '#6B7280' }}
              placeholder="Selecciona una moneda"
              placeholderStyle={{ color: '#6B7280' }}
              iconColor="#6B7280"
              autoScroll={false}
            />
          </View>

          <View className="mt-4">
            <Button
              mode="outlined"
              onPress={clearFilters}
              style={{ marginBottom: 12, borderRadius: 8 }}
              labelStyle={{ color: '#6B7280' }}
            >
              Limpiar Filtros
            </Button>
            <Button
              mode="contained"
              onPress={applyFilters}
              style={{ borderRadius: 8 }}
              buttonColor="#3B82F6"
              textColor="white"
            >
              Aplicar Filtros
            </Button>
          </View>
        </View>
      </Animated.View>
    </>
  )
}
