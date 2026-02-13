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

const timeAgo = ({createdAt}:{createdAt:string}) => {
	
	const currentTime = Date.now()
	const createdTime = new Date(createdAt).getTime()
	const diffTime = currentTime - createdTime

	const seconds = Math.floor(diffTime / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	let timeAgo = ''
	if (seconds < 60) {
		timeAgo = `${seconds} s ago`
	} else if (minutes < 60) {
		timeAgo = `${minutes} min ago`
	} else if (hours < 24) {
		timeAgo = `${hours} hr ago`
	} else if (days < 7) {
		timeAgo = `${days} d ago`
	} else if (days < 14) {
		timeAgo = 'Last week'
	} else {
		timeAgo = `${new Date(createdAt).toLocaleDateString()}`
	}

	return timeAgo
}

export { notificationHelper, timeAgo }
