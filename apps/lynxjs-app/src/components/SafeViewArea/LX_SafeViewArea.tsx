import type { ReactNode } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';
import styles from './safeViewArea.module.scss';

interface SafeViewAreaProps {
  children: ReactNode;
  style?: CSSProperties;
}

function SafeViewArea({ children, style }: SafeViewAreaProps) {
  const isIOS = SystemInfo.platform === 'iOS';

  return (
    <view class={`${styles['safe-area']} ${isIOS ? styles['ios'] : styles['android']}`} style={style}>
      {children}
    </view>
  );
}

export default SafeViewArea;
