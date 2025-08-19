import ninetyNineLogo from '../../assets/images/99-app-logo.png';

interface NinetyNineIconProps {
  className?: string;
  size?: number | string;
}

export default function NinetyNineIcon({ className = "", size = 24 }: NinetyNineIconProps) {
  return (
    <img
      src={ninetyNineLogo}
      alt="99 App"
      width={size}
      height={size}
      className={`${className} object-contain`}
    />
  );
}