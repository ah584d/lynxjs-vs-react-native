import './navbar.css';

interface NavBarProps {
  onBack?: () => void;
  onFavorite?: () => void;
  title?: string;
}

export default function NavBar({ onBack, title }: NavBarProps) {
  return (
    <view className='nav-bar'>
      <text bindtap={onBack} className='nav-back'>
        ⬅️
      </text>
      <text className='nav-title'>{title}</text>
    </view>
  );
}
