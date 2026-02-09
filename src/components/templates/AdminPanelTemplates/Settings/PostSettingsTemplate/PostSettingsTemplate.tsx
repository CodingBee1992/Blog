import PostsSettings from '../../../../organism/PostsSettings/PostsSettings'
import styles from './PostSettingsTemplate.module.scss'

const PostSettingsTemplate = () => {
	return (
		<div className={styles.postSettingsTemplateContainer}>
			<PostsSettings />
		</div>
	)
}

export default PostSettingsTemplate
