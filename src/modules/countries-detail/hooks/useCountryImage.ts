import { useState, useEffect } from 'react'
import axios from 'axios'
import { UnsplashImageResponse } from '../types/UnsplashImageType'
import { API_UNSPLASH_URL } from '../constants/constants'

export const useCountryImage = (countryName: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true)
      try {
        const response = await axios.get<UnsplashImageResponse>(API_UNSPLASH_URL, {
          params: {
            query: countryName,
            per_page: 1,
            order_by: 'relevant',
            client_id: 'F6qcG4EG93sTCtzH8zmXWpsnsT32JvQXTWEuyFLZAKE',
          },
          headers: {
            Accept: 'application/json',
          },
        })

        if (response.data.results.length > 0) {
          setImageUrl(response.data.results[0].urls.raw)
        } else {
          setImageUrl(null)
        }
      } catch (err) {
        setError('No se pudo obtener la imagen del país')
        setImageUrl(null)
      } finally {
        setLoading(false)
      }
    }

    if (countryName) {
      fetchImage()
    }
  }, [countryName])

  return { imageUrl, loading, error }
}
