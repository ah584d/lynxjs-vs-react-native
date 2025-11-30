import './safeViewArea.css';
function SafeViewArea({ children, style }) {
    const isIOS = SystemInfo.platform === 'iOS';
    return (<view class={`safe-area ${isIOS ? 'ios' : 'android'}`} style={style}>
      {children}
    </view>);
}
export default SafeViewArea;
