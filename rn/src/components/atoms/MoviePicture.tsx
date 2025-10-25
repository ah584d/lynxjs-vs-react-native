import { ReactElement, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Colors } from '@/common/colors';
import { useShimmerAnimation } from '@/hooks/useAnimations';

interface MoviePictureProps {
  posterUrl: string;
}

export const MoviePicture = ({ posterUrl }: MoviePictureProps): ReactElement => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shimmerTranslateX, shimmerOpacity] = useShimmerAnimation(isLoading);

  if (imageError) {
    return (
      <View style={styles.poster}>
        <Text style={styles.oopsText}>Oops!!</Text>
        <EntypoIcon name='emoji-sad' size={60} color='orange' />
        <Text style={styles.oopsText}>something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.shimmerContainer}>
          <View style={styles.shimmerBase} />
          <Animated.View
            style={[
              styles.shimmerOverlay,
              {
                transform: [{ translateX: shimmerTranslateX }],
                opacity: shimmerOpacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.shimmerGlow,
              {
                transform: [{ translateX: shimmerTranslateX }],
                opacity: shimmerOpacity,
              },
            ]}
          />
        </View>
      )}
      <Image source={{ uri: posterUrl }} style={[styles.poster, isLoading && styles.hiddenImage]} onLoad={handleImageLoad} onError={handleImageError} />
    </View>
  );

  function handleImageLoad() {
    setIsLoading(false);
  }

  function handleImageError() {
    setIsLoading(false);
    setImageError(true);
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  poster: {
    width: 200,
    height: 290,
    borderRadius: 4,
    borderColor: Colors.light.grayBorder,
    borderWidth: 1,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 290,
    borderRadius: 4,
    overflow: 'hidden',
    zIndex: 1,
  },

  shimmerBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F0F0F0',
  },

  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#E0E0E0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5,
  },
  shimmerGlow: {
    position: 'absolute',
    top: 0,
    left: -60,
    width: 60,
    height: '100%',
    backgroundColor: '#F8F8F8',
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 3,
  },
  hiddenImage: {
    opacity: 0,
  },
  oopsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.purple,
    padding: 16,
    textAlign: 'center',
  },
});
