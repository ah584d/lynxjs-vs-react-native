import type { ReactElement } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';
import { useNavigate } from 'react-router';
import { IS_IOS } from '@/common/LX_constants.js';
import NavBar from '../NavBar/LX_NavBar.jsx';
import SafeViewArea from '../SafeViewArea/LX_SafeViewArea.jsx';
import styles from './pageView.module.scss';

interface PageViewProps {
  children: ReactElement;
  title?: string;
  style?: CSSProperties;
  isBack?: boolean;
}

function PageView({ children, style, title, isBack }: PageViewProps) {
  const navigate = useNavigate();

  return (
    <SafeViewArea style={style}>
      <view class={`${styles['page-view-container']} ${IS_IOS ? styles['page-view-container-ios'] : ''}`}>
        {isBack ? (
          <NavBar
            title={title}
            onBack={() => {
              navigate('/');
            }}
          />
        ) : null}
        {children}
      </view>
    </SafeViewArea>
  );
}

export default PageView;
