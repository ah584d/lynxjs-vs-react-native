import { type ReactElement, useState } from '@lynx-js/react';
import { useMovieStore } from '@fennex-sand/hooks';
import styles from './hamburger.module.scss';

export function MenuCurtain(): ReactElement {
  const menuOpened = useMovieStore(state => state.menuOpened);

  return <></>;
}
