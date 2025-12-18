import { useTheme } from '@/features/theme'

export interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  width = 70,
  height = 70,
  className = ''
}) => {
  const { theme } = useTheme()
  const logoColor = theme === 'dark' ? '#F4320B' : '#221F20'

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22 15 L34 15 L34 68 Q34 82 50 82 Q66 82 66 68 L66 45 Q66 32 53 32 L53 44 Q54 44 54 45 L54 68 Q54 70 50 70 Q46 70 46 68 L46 15 L22 15 Z" 
        fill={logoColor}
      />
      <circle cx="60" cy="20" r="6" fill={logoColor}/>
    </svg>
  )
}