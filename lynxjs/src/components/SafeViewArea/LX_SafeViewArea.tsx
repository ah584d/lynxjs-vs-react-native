import type { ReactNode } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';
import './safeViewArea.css';

interface SafeViewAreaProps {
  children: ReactNode;
  style?: CSSProperties;
}

function SafeViewArea({ children, style }: SafeViewAreaProps) {
  const isIOS = SystemInfo.platform === 'iOS';

  return (
    <view class={`safe-area ${isIOS ? 'ios' : 'android'}`} style={style}>
      {children}
    </view>
  );
}

export default SafeViewArea;
