import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

interface CountryInfoCardProps {
  title: string
  children: React.ReactNode
}

export default function CountryInfoCard({ title, children }: CountryInfoCardProps) {
  return (
    <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
      {children}
    </TouchableOpacity>
  )
}
