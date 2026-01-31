import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './DeleteAccountTemplate.module.scss'
import FormBtn from '../../../atoms/FormBtn/FormBtn'
import AnchorLink from '../../../atoms/AnchorLink/AnchorLink'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useDeleteAccountMutation } from '../../../../slices/api/userApi'
import useMenuContext from '../../../../hooks/useMenuContext'
import { acknowledgements } from '../../../../utils/legalFormsData'
import AccountInputBox from '../../../modules/AccountInputBox/AccountInputBox'
import APIResponseMessage from '../../../atoms/APIResponseMessage/APIResponseMessage'

import WrapperBox from '../../../atoms/WrapperBox/WrapperBox'
import CheckMarkList from '../../../modules/CheckMarkList/CheckMarkList'

const DeleteAccountTemplate = () => {
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [enabledButton, setEnabledButton] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const [deleteAccount] = useDeleteAccountMutation()
	const { signOut } = useMenuContext()

	useEffect(() => {
		if (errorMessage) {
			const timer = setTimeout(() => {
				setErrorMessage('')
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [errorMessage])

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget

		setConfirmPassword(value)
	}

	const confirmDeletion = async (e: FormEvent) => {
		e.preventDefault()
		try {
			if (!confirmPassword) return

			const res = await deleteAccount(confirmPassword).unwrap()

			if (res) signOut()
		} catch (error) {
			if (typeof error === 'object' && error !== null) {
				const fetchError = error as FetchBaseQueryError
				const message =
					fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data
						? (fetchError.data.message as string)
						: 'An unexpected error has occured'

				setErrorMessage(message)
			} else {
				setErrorMessage('An unexpected error has occured')
			}
		}
	}

	return (
		<div className={styles.deleteAccountContainer}>
			<h1 className={styles.title}>Delete Account</h1>

			<div className={styles.deleteAccountWrapper}>
				<WrapperBox>
					<CheckMarkList
						data={acknowledgements}
						confirmPassword={confirmPassword}
						setEnabledButton={setEnabledButton}
					/>
					

					<form className={styles.deleteForm} onSubmit={e => confirmDeletion(e)}>
						<AccountInputBox
							id="confirmPassword"
							label="Confirm Password"
							value={confirmPassword}
							type="password"
							onChangeInput={onChangeInput}></AccountInputBox>
						{errorMessage && <APIResponseMessage messageType="error">{errorMessage}</APIResponseMessage>}
						<div className={styles.formBtns}>
							<FormBtn
								type="submit"
								isSubmitting={!enabledButton}
								className={`${styles.deleteAccount} ${enabledButton ? styles.confirmDeletion : ''}`}>
								Confirm Deletion
							</FormBtn>
							<AnchorLink href="/account" className={styles.cancelDeletion}>
								Cancel
							</AnchorLink>
						</div>
					</form>
				</WrapperBox>
			</div>
		</div>
	)
}

export default DeleteAccountTemplate
