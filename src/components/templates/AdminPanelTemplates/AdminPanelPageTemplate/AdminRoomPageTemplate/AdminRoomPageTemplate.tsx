import AdminList from '../../../../organism/AdminList/AdminList'
import styles from './AdminRoomPage.module.scss'

const AdminRoomPageTemplate = () => {
  return (
    <div className={styles.roomConatiner}>
      <AdminList />
    </div>
  )
}

export default AdminRoomPageTemplate