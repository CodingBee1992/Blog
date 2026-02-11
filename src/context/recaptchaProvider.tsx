import type { ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

interface CaptchaProps {
	children: ReactNode
}

export function RecaptchaProvider({ children }: CaptchaProps) {
	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
			scriptProps={{ async: true, defer: true, appendTo: 'head' }}>
			{children}
		</GoogleReCaptchaProvider>
	)
}
