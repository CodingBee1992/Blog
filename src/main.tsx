import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './App.scss'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { RecaptchaProvider } from './context/recaptchaProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RecaptchaProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</RecaptchaProvider>
	</StrictMode>,
)
