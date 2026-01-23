interface notificationHelperProps {
	notif: {
		action: string
		role: string
		entityType: 'User' | 'Post' | 'Comment' | 'Like'
		name: string
		avatar: string
		createdAt: string
		changes: Record<string, string>
	}
}
const notificationMessages: Record<string, (title?: string) => string> = {
	'New post': title => `New post ${title} has been added`,
	'Post updated': title => `Post ${title} has been updated`,
	'Post deleted': title => `Post ${title} has been deleted`,
	'Post published': title => `New post  ${title} has been published`,
	'New comment': title => `New comment on post  ${title}`,
	'Comment updated': title => `Updated comment in post  ${title}`,
	'Comment deleted': title => `Comment removed from post  ${title}`,
	'Post liked': title => `New post like : ${title}`,
	'Post unliked': title => `Unliked post : ${title}`,
}

const notificationHelper = ({ notif }: notificationHelperProps) => {
	return notificationMessages[notif.action]?.(notif.changes?.postTitle) ?? notif.action
}


export default notificationHelper
