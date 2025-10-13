import type { ReactNode } from "react"


interface SocialIconProps {
    children:ReactNode
    styles:{[key:string]:string}
    href:string
}

const SocialIcon = ({styles,href,children}:SocialIconProps) => {

  return (
    <li className={styles.link}>
        <a href={href}>
            {children}
        </a>
    </li>
  )
}

export default SocialIcon