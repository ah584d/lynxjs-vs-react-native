import type { ReactNode } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';
import { useNavigate } from 'react-router';
import NavBar from '../NavBar/index.jsx';
import SafeViewArea from '../SafeViewArea/index.jsx';
import './styles.css';

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
              console.log(1);
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
