import type { ReactNode } from 'react'
import styles from './HeaderText.module.scss'

interface HeaderTextProps {
    children:ReactNode
}

const HeaderText = ({children}:HeaderTextProps) => {
  return (
    <div className={`${styles.designHeader} row`}>
          <div className={styles.column}>
            <span>Category</span>
            {children}
          </div>
      </div>
  )
}

export default HeaderText