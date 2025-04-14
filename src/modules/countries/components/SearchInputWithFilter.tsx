import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

interface SearchInputWithFilterProps {
  search: string
  setSearch: (text: string) => void
  onFilterPress: () => void
}

export default function SearchInputWithFilter({ search, setSearch, onFilterPress }: SearchInputWithFilterProps) {
  return (
    <View className="p-3">
      <View className="flex-row items-center">
        <View className="flex-1 shadow-sm">
          <TextInput
            mode="outlined"
            placeholder="¿Qué te gustaría buscar hoy?"
            value={search}
            onChangeText={setSearch}
            left={<TextInput.Icon icon={() => <Icon name="search" size={18} />} />}
            style={{ height: 44, backgroundColor: 'white' }}
            outlineColor="#d1d5dc"
            activeOutlineColor="#d1d5dc"
            placeholderTextColor="#6B7280"
            theme={{
              roundness: 12,
            }}
          />
        </View>

        <TouchableOpacity
          className="ml-2 bg-white border border-gray-300 rounded-lg p-3 shadow-sm"
          onPress={onFilterPress}
        >
          <Icon name="filter" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
