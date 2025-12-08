import type { ReactNode } from "react"


interface SocialIconProps {
    children:ReactNode
    styles:{[key:string]:string}
    href:string
    ariaLabel:string
}

const SocialIcon = ({styles,href,ariaLabel,children}:SocialIconProps) => {

  return (
    <li className={styles.link}>
        <a href={href} aria-label={ariaLabel}>
            {children}
        </a>
    </li>
  )
}

export default SocialIcon