import Cookies from 'js-cookie'
import { useIncrementPageViewsMutation, useIncrementPostViewsMutation } from '../slices/api/statisticsApi'

const useIncrementViews = () => {
	const [incrementPostViews] = useIncrementPostViewsMutation()
	const [incrementPageViews] = useIncrementPageViewsMutation()
	const today = new Date().toISOString().slice(0, 10)

	const handleIncrementPageViews = async ({ path }: { path: string }) => {
		const raw = localStorage.getItem(path)
		const consent = Cookies.get('consent-stat') === 'true'
		if (!consent) return

		if (raw) {
			try {
				const stored = JSON.parse(raw)

				if (stored.day === today) return
			} catch {
				localStorage.removeItem(path)
			}
		}

		try {
			localStorage.setItem(path, JSON.stringify({ day: today }))

			await incrementPageViews({})
		} catch (err) {
			console.error('Failed to count page view', err)
		}
	}
	const handleIncrementPostViews = async ({ postId }: { postId: string }) => {
		const raw = localStorage.getItem(postId)
		const consent = Cookies.get('consent-stat') === 'true'
		if (!consent) return

		if (raw) {
			try {
				const stored = JSON.parse(raw)

				if (stored.day === today) return
			} catch {
				localStorage.removeItem(postId)
			}
		}

		try {
			localStorage.setItem(postId, JSON.stringify({ day: today }))

			await incrementPostViews({ postId })
		} catch (err) {
			console.error('Failed to count page view', err)
		}
	}

	return { handleIncrementPageViews, handleIncrementPostViews }
}

export default useIncrementViews
