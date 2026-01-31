import type { ReactNode } from "react"
import styles from './AdminTemplate.module.scss'

const AdminTemplate = ({children}:{children:ReactNode}) => {
  return (
    <div className={styles.adminTemplateContainer}>{children}</div>
  )
}

export default AdminTemplate