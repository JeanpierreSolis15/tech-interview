import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'
import '../global.css'
import { PaperProvider } from 'react-native-paper'
import client from './modules/services/apolloClient'
import { ApolloProvider } from '@apollo/client'

export default function App() {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  )
}
