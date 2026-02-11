import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const useRecaptchaToken = () => {
	const { executeRecaptcha } = useGoogleReCaptcha()

	const getToken = async (action = 'submit') => {
		if (!executeRecaptcha) {
			console.warn('reCAPTCHA not ready')
			return null
		}
		const token = await executeRecaptcha(action)
		return token
	}

	return { getToken }
}

export { useRecaptchaToken }
