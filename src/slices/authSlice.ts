import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface SetDataType {
	isLogged: boolean
	name: string
	id: string
	avatar: string
	// isAdmin:boolean
	role: string
}
let name = ''
let id = ''
let avatar = ''
// let isAdmin = false
let role =''
const stored = localStorage.getItem('user')
if (stored) {
	try {
		const decoded = JSON.parse(stored)
		
		name = decoded.name || ''
		id = decoded.id || ''
		avatar = decoded.avatar || ''
		// isAdmin = decoded.isAdmin || false
		role = decoded.role || ''
	} catch (error) {
		console.warn('Błąd podczas dekodowania usera z localStorage:', error)
	}
}

const initialState: SetDataType = {
	isLogged: Cookies.get('user') === 'ok',
	name,
	id,
	avatar,
	// isAdmin,
	role
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<boolean>) => {
			Cookies.set('user', 'ok', { expires: 1 })
			state.isLogged = action.payload
		},
		setData: (state, action: PayloadAction<SetDataType>) => {
			const { name, id, avatar,role } = action.payload
			state.name = name
			state.id = id
			state.avatar = avatar
			// state.isAdmin = isAdmin
			state.role = role

			try {
				const encoded = JSON.stringify({ name, id, avatar,role })

				localStorage.setItem('user', encoded)
			} catch (error) {
				console.log('Nie udało się zapisać w localStorage:', error)
			}
		},

		setLogout: state => {
			Cookies.remove('user')
			localStorage.removeItem('user')
			state.isLogged = false
			state.name = ''
			state.id = ''
			state.avatar = ''
			// state.isAdmin = false
			state.role = ''
		},
	},
})

export const { setLogin, setData, setLogout } = authSlice.actions
