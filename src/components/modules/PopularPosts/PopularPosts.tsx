import styles from './PopularPosts.module.scss'
import img from '../../../assets/img/Buntownik.jpg'
import { CommentsSVG, HeartSVG, ViewsSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
const data = [
	{ image: img, postTitle: 'Rico i Jumbo', views: 4356, comments: 2345, likes:798 },
	{ image: img, postTitle: '„Kruszynka – w sercu kosmicznej pustki”', views: 4356, comments: 2345, likes:798 },
	{ image: img, postTitle: '„Nocny glob Ereth – świat bez dnia”', views: 4356, comments: 2345, likes:798 },
	{ image: img, postTitle: '„Płynne światło Vesparii”', views: 4356, comments: 2345, likes:798 },
	{ image: img, postTitle: '„Mgławica Palaestra – próg nieznanego”', views: 4356, comments: 2345, likes:798 },
]

const PopularPosts = () => {
	return (
		<div className={styles.popularPostsContainer}>
			<h3 className={styles.popularPostsContainerTitle}>Popular Posts</h3>
			<AnchorLink href={`/admin/posts/addpost`} className={styles.addNewPost}>+ Add New</AnchorLink>
			{data.map((post, index) => (
				<div key={index} className={styles.popularPostWrapper}>
					<div className={styles.popularPostImageBox}>
						<img src={post.image} alt="" />
					</div>
					<div className={styles.popularPostInfo}>
						<AnchorLink href="/" className={styles.popularPostInfoTitle}>
							{post.postTitle}
						</AnchorLink>

						<div className={styles.popularPostStatsBox}>
							<div className={styles.popularPostStats}>
								<ViewsSVG className={styles.popularViewsSVG} />
								<span>{post.views} Views</span>
							</div>
							<div className={styles.popularPostStats}>
								<HeartSVG className={styles.popularViewsSVG} />
								<span>{post.likes} Likes</span>
							</div>
							<div className={styles.popularPostStats}>
								<CommentsSVG className={styles.popularViewsSVG} />
								<span>{post.comments} Comments</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default PopularPosts
