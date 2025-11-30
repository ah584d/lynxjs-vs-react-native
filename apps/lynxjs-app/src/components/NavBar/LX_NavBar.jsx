import './navbar.css';
export default function NavBar({ onBack, title }) {
    return (<view className='nav-bar'>
      <text bindtap={onBack} className='nav-back'>
        ⬅️
      </text>
      <text className='nav-title'>{title}</text>
    </view>);
}
