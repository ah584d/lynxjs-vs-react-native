import type { ReactNode } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';
import { useNavigate } from 'react-router';
import NavBar from '../NavBar/LX_NavBar.jsx';
import SafeViewArea from '../SafeViewArea/LX_SafeViewArea.jsx';
import './pageView.css';

interface PageViewProps {
  children: ReactNode;
  title?: string;
  style?: CSSProperties;
  isBack?: boolean;
}

function PageView({ children, style, title, isBack }: PageViewProps) {
  const navigate = useNavigate();

  return (
    <SafeViewArea style={style}>
      <view class='page-container'>
        {isBack ? (
          <NavBar
            title={title}
            onBack={() => {
              navigate('/');
            }}
          />
        ) : (
          <></>
        )}
        {children}
      </view>
    </SafeViewArea>
  );
}

export default PageView;
