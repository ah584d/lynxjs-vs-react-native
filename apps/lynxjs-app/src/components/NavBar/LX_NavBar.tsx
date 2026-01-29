import styles from './navBar.module.scss';

interface NavBarProps {
  onBack?: () => void;
  onFavorite?: () => void;
  title?: string;
}

export default function NavBar({ onBack, title }: NavBarProps) {
  return (
    <view className={styles['nav-bar']}>
      <text bindtap={onBack} className={styles['nav-back']}>
        ⬅️
      </text>
      <text className={styles['nav-title']}>{title}</text>
    </view>
  );
}
