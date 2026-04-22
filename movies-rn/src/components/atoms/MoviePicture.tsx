import { ReactElement, Suspense, use } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useShimmerAnimation } from '@/hooks/animations/useAnimations';
import { createThemedStyles, useThemedStyles } from '@/hooks/useTheme';

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
        resolve('ERROR');
      });
  });

  imagePromiseCache.set(url, promise);
  return promise;
};

export const MoviePictureLoading = (): ReactElement => {
  const [shimmerTranslateX, shimmerOpacity] = useShimmerAnimation(true);
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <View style={style.poster}>
      <View style={style.shimmerContainer}>
        <View style={style.shimmerBase} />
        <Animated.View
          style={[
            style.shimmerOverlay,
            {
              transform: [{ translateX: shimmerTranslateX }],
              opacity: shimmerOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            style.shimmerGlow,
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
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <View style={style.poster}>
      <Text style={style.oopsText}>Oops!!</Text>
      <EntypoIcon name='emoji-sad' size={60} color='orange' />
      <Text style={style.oopsText}>something went wrong</Text>
    </View>
  );
};

const MoviePictureContent = ({ posterUrl }: MoviePictureProps): ReactElement => {
  const imagePromise = createImagePromise(posterUrl);
  const style = useThemedStyles(styles.light, styles.dark);

  const loadedImageUrl = use(imagePromise);

  if (loadedImageUrl === 'ERROR') {
    return <MoviePictureError />;
  }

  return <Image source={{ uri: loadedImageUrl }} style={style.poster} />;
};

export const MoviePicture = ({ posterUrl }: MoviePictureProps): ReactElement => {
  const style = useThemedStyles(styles.light, styles.dark);

  return (
    <View style={style.container}>
      <Suspense fallback={<MoviePictureLoading />}>
        <MoviePictureContent posterUrl={posterUrl} />
      </Suspense>
    </View>
  );
};

const styles = createThemedStyles(colors =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },

    poster: {
      width: 200,
      height: 290,
      borderRadius: 8,
      borderColor: colors.grayBorder,
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
      backgroundColor: colors.lightGray2,
    },

    shimmerOverlay: {
      position: 'absolute',
      top: 0,
      left: -100,
      width: 100,
      height: '100%',
      backgroundColor: colors.white,
      shadowColor: colors.lightGray,
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
      backgroundColor: colors.lightGray3,
      shadowColor: colors.lightGray,
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
      backgroundColor: colors.background,
    },

    loadingText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.green,
      textAlign: 'center',
    },

    oopsText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.purple,
      padding: 16,
      textAlign: 'center',
    },
  }),
);
