import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import Video, { VideoRef } from 'react-native-video'
import Slider from '@react-native-community/slider'
import { Button } from 'react-native-paper'

const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<VideoRef>(null)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const onProgress = (data: { currentTime: number; seekableDuration: number }) => {
    setProgress(data.currentTime)
    setDuration(data.seekableDuration || 1)
  }

  const onSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value)
    }
  }

  return (
    <View>
      <Video
        ref={videoRef}
        source={{
          uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          type: 'm3u8',
        }}
        style={{ width: '100%', height: 200 }}
        paused={!isPlaying}
        onProgress={onProgress}
        onError={error => console.log('Video error:', error)}
        onLoad={data => setDuration(data.duration || 1)}
        resizeMode="contain"
      />
      <Button
        mode="outlined"
        onPress={handlePlayPause}
        style={{ marginTop: 10, marginBottom: 12, borderRadius: 8 }}
        labelStyle={{ color: '#6B7280' }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={progress}
        onSlidingComplete={onSeek}
      />
    </View>
  )
}

export default VideoPlayer
