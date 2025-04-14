import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import WebView from 'react-native-webview'
import Slider from '@react-native-community/slider'
import { Button } from 'react-native-paper'

const HLSPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const webviewRef = useRef<WebView>(null)

  const handlePlayPause = () => {
    if (!webviewRef.current) {
      console.log('WebView ref is not ready')
      return
    }
    if (isPlaying) {
      webviewRef.current.injectJavaScript(`
        var video = document.getElementById('video');
        video.pause();
        console.log('stop video');
      `)
      setIsPlaying(false)
    } else {
      webviewRef.current.injectJavaScript(`
        var video = document.getElementById('video');
        if (video.readyState >= 2) {
          video.play().catch(function(error) {
            console.error('play error:', error);
          });
        } else {
          console.log('not ready, readyState:', video.readyState);
        }
      `)
      setIsPlaying(true)
    }
  }

  return (
    <View>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{
          html: `
            <html>
              <head>
                <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
              </head>
              <body>
                <video id="video" style="width:100%; height:100%;"></video>
              </body>
              <script>
                var video = document.getElementById('video');
                var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
                if (Hls.isSupported()) {
                  var hls = new Hls();
                  hls.loadSource(videoSrc);
                  hls.attachMedia(video);
                  hls.on(Hls.Events.ERROR, function(event, data) {
                    console.error('HLS error:', data);
                  });
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                  video.src = videoSrc;
                } else {
                  console.error('HLS not supported');
                }
                video.addEventListener('timeupdate', function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'timeupdate',
                    currentTime: video.currentTime,
                    duration: video.duration
                  }));
                });
                video.addEventListener('error', function() {
                  console.error('Video error:', video.error);
                });
              </script>
            </html>
          `,
        }}
        style={{ width: '100%', height: 200 }}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={event => {
          const data = JSON.parse(event.nativeEvent.data)
          if (data.type === 'timeupdate') {
            setProgress(data.currentTime)
            setDuration(data.duration || 1)
          }
        }}
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
        onSlidingComplete={value => {
          if (webviewRef.current) {
            webviewRef.current.injectJavaScript(`
              var video = document.getElementById('video');
              video.currentTime = ${value};
            `)
          }
        }}
      />
    </View>
  )
}

export default HLSPlayer
