import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface SetDataType {
	isLogged: boolean
	name: string
	id: string
	avatar: string
}
let name =''
let id = ''
let avatar =''
const stored = localStorage.getItem("user")

if(stored){
	try {
		const decoded = JSON.parse(atob(stored))
		name = decoded.name || ''
		id = decoded.id || ''
		avatar = decoded.avatar || ''
	} catch (error) {
		console.warn('Błąd podczas dekodowania usera z localStorage:',error)
	}


}

const initialState: SetDataType = {
	isLogged: Cookies.get('user') === 'ok',
	name,
	id,
	avatar,
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
			const { name, id, avatar } = action.payload
			console.log(id);
			state.name = name
			state.id = id
			state.avatar = avatar

			const encoded = btoa(JSON.stringify({name,id,avatar}))

			localStorage.setItem('user', encoded)
		},

		setLogout: state => {
			Cookies.remove('user')
			localStorage.removeItem('user')
			state.isLogged = false
			state.name = ''
			state.id = ''
			state.avatar = ''
		},
	},
})

export const { setLogin, setData, setLogout } = authSlice.actions
