import { ReactElement, use, useMemo } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Colors } from '@/common/colors';
import { useShimmerAnimation } from '@/hooks/useAnimations';

interface MoviePictureProps {
  posterUrl: string;
}

const imagePromiseCache = new Map<string, Promise<string>>();

const createImagePromise = (url: string): Promise<string> => {
  if (imagePromiseCache.has(url)) {
    return imagePromiseCache.get(url)!;
  }

  const promise = new Promise<string>(resolve => {
    Image.prefetch(url)
      .then(() => resolve(url))
      .catch(() => {
        imagePromiseCache.delete(url);
        resolve('ERROR');
      });
  });

  imagePromiseCache.set(url, promise);
  return promise;
};

export const MoviePictureLoading = (): ReactElement => {
  const [shimmerTranslateX, shimmerOpacity] = useShimmerAnimation(true);

  return (
    <View style={styles.poster}>
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
    </View>
  );
};

const MoviePictureError = (): ReactElement => {
  return (
    <View style={styles.poster}>
      <Text style={styles.oopsText}>Oops!!</Text>
      <EntypoIcon name='emoji-sad' size={60} color={Colors.light.yellow} />
      <Text style={styles.oopsText}>something went wrong</Text>
    </View>
  );
};

const MoviePictureContent = ({ posterUrl }: MoviePictureProps): ReactElement => {
  const imagePromise = useMemo(() => createImagePromise(posterUrl), [posterUrl]);

  const loadedImageUrl = use(imagePromise);

  if (loadedImageUrl === 'ERROR') {
    return <MoviePictureError />;
  }

  return <Image source={{ uri: loadedImageUrl }} style={styles.poster} />;
};

export const MoviePicture = ({ posterUrl }: MoviePictureProps): ReactElement => {
  return (
    <View style={styles.container}>
      <MoviePictureContent posterUrl={posterUrl} />
    </View>
  );
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
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },

  shimmerBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.lightGray2,
  },

  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: Colors.light.white,
    shadowColor: Colors.light.lightGray,
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
    backgroundColor: Colors.light.lightGray3,
    shadowColor: Colors.light.lightGray,
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
  loadingPoster: {
    backgroundColor: Colors.light.background,
  },

  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.green,
    textAlign: 'center',
  },

  oopsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.purple,
    padding: 16,
    textAlign: 'center',
  },
});
