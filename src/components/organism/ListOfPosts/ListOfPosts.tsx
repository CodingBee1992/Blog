import { useFetchPostsByLimitQuery } from '../../../slices/api/apiSlice'
import type { ExtendedArticleContentProps } from '../../../types/types'

import AnchorLink from '../../atoms/AnchorLink/AnchorLink'



const ListOfPosts = () => {
	const { data } = useFetchPostsByLimitQuery({ limit: 40, page: 1 })
	if (!data) return
	const { posts, totalPages } = data
	console.log(posts)
	console.log(totalPages)
	return (
		<div>
			<table>
				<thead>
					{posts && (
						<tr>
							<th>Id</th>
							<th>Title</th>
							<th>Status</th>
							<th>Author</th>
							<th>Comments</th>
							<th>Created At</th>
							<th>Published At</th>
							<th>Actions</th>
						</tr>
					)}
				</thead>
				<tbody>
					{posts &&
						posts.map((item: ExtendedArticleContentProps, index: number) => (
							<tr key={index}>
								<td>{item._id}</td>
								<td>{item.mainTitle}</td>
								<td>{item.status}</td>
								<td>{item.author.name}</td>
								<td>{item.comments.length}</td>
								<td>{new Date(item.createdAt).toLocaleDateString()}</td>
								<td>{item.publishedAt ? item.publishedAt : 'Publish'}</td>
								<td>
									<AnchorLink href="/admin/posts/editpost/?id=1">Edit</AnchorLink>
									<button>Delete</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default ListOfPosts
