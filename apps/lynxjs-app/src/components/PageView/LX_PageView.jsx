import { useNavigate } from 'react-router';
import { IS_IOS } from '@/common/LX_constants.js';
import NavBar from '../NavBar/LX_NavBar.jsx';
import SafeViewArea from '../SafeViewArea/LX_SafeViewArea.jsx';
import './pageView.css';
function PageView({ children, style, title, isBack }) {
    const navigate = useNavigate();
    return (<SafeViewArea style={style}>
      <view class={`page-view-container ${IS_IOS ? 'page-view-container-ios' : ''}`}>
        {isBack ? (<NavBar title={title} onBack={() => {
                navigate('/');
            }}/>) : null}
        {children}
      </view>
    </SafeViewArea>);
}
export default PageView;
