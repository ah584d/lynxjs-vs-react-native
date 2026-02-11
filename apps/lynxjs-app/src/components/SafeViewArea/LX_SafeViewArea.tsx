import type { ReactNode } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';
import { IS_IOS } from '@/common/LX_constants.js';
import styles from './safeViewArea.module.scss';

interface SafeViewAreaProps {
  children: ReactNode;
  style?: CSSProperties;
}

function SafeViewArea({ children, style }: SafeViewAreaProps) {
  return (
    <view class={`${styles['safe-area']} ${IS_IOS ? styles['ios'] : styles['android']}`} style={style}>
      {children}
    </view>
  );
}

export default SafeViewArea;
