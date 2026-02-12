import styles from './PopularPosts.module.scss'

import { CommentsSVG, HeartSVG, ViewsSVG } from '../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'

import handleCreateUrl from '../../../hooks/createUrl'
import type { TopRatedStatsTypes } from '../../../types/types'

interface PopularPostsProps {
	topRated: TopRatedStatsTypes[]
}

const PopularPosts = ({ topRated }: PopularPostsProps) => {
	return (
		<div className={styles.popularPostsContainer}>
			<h3 className={styles.popularPostsContainerTitle}>Popular Posts</h3>
			<AnchorLink href={`/admin/posts/addpost`} className={styles.addNewPost}>
				+ Add New
			</AnchorLink>
			{topRated?.map((post, index) => {
				const url = handleCreateUrl({ categories: post.categories, seo: post.seo, _id: post.postId })

				return (
					<div key={index} className={styles.popularPostWrapper}>
						<div className={styles.popularPostImageBox}>
							<img src={post.image} alt="" />
						</div>
						<div className={styles.popularPostInfo}>
							<AnchorLink href={url} className={styles.popularPostInfoTitle}>
								„{post.title}”
							</AnchorLink>

							<div className={styles.popularPostStatsBox}>
								<div className={styles.popularPostStats}>
									<div className={styles.popularViewsSVG}>
										<ViewsSVG className={styles.showViews} />
									</div>
									<span>{post.totalViews} Views</span>
								</div>
								<div className={styles.popularPostStats}>
									<div className={styles.popularViewsSVG}>
										<HeartSVG className={styles.heartSVG} />
									</div>
									<span>{post.postlikes} Likes</span>
								</div>
								<div className={styles.popularPostStats}>
									<div className={styles.popularViewsSVG}>
										<CommentsSVG className={styles.commentsSvg} />
									</div>
									<span>{post.commentsCount} Comments</span>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default PopularPosts
