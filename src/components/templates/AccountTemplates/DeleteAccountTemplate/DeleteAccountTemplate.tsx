import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

import ProfileInfoBox from '../../../atoms/ProfileInfoBox/ProfileInfoBox'
import styles from './DeleteAccountTemplate.module.scss'
import FormBtn from '../../../atoms/FormBtn/FormBtn'
import AnchorLink from '../../../atoms/AnchorLink/AnchorLink'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useDeleteAccountMutation } from '../../../../slices/api/userApi'

import useMenuContext from '../../../../hooks/useMenuContext'
import { WarnSVG } from '../../../../assets/icons/adminPanelIcons/AdminPanelIcons'
import { acknowledgements } from '../../../../utils/legalFormsData'
import AccountInputBox from '../../../modules/AccountInputBox/AccountInputBox'
import APIResponseMessage from '../../../atoms/APIResponseMessage/APIResponseMessage'
import CheckMark from '../../../atoms/Checkmark/CheckMark'

const DeleteAccountTemplate = () => {
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [enabledButton, setEnabledButton] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const [checked, setChecked] = useState<Set<number>>(new Set())

	const [deleteAccount] = useDeleteAccountMutation()
	const { signOut } = useMenuContext()

	useEffect(() => {
		if (confirmPassword.length > 1 && checked.size === acknowledgements.length) {
			setEnabledButton(true)
		} else {
			setEnabledButton(false)
		}
	}, [checked.size, confirmPassword])

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
	const handleCheckMark = (id: number) => {
		// if (!checked.includes(id)) {
		// 	setChecked(prev => [...prev, id])

		// }else{
		// 	setChecked(prev => prev.filter(v => v !== id))
		// }
		setChecked(prev => {
			const next = new Set(prev)

			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}

			return next
		})
	}

	return (
		<div className={styles.deleteAccountContainer}>
			<h1 className={styles.title}>Delete Account</h1>

			<div className={styles.deleteAccountWrapper}>
				<ProfileInfoBox>
					<ul className={styles.acknowledgementsList}>
						{acknowledgements.map((item, id) => {
							const isChecked = checked.has(id)

							return (
								<li key={id} className={styles.acknowledgement}>
									<label htmlFor={`checkbox-${id}`} className={styles.checkbox}>
										<input
											onChange={() => handleCheckMark(id)}
											checked={isChecked}
											type="checkbox"
											id={`checkbox-${id}`}
										/>
										<CheckMark
											className={`${styles.checkmark} ${isChecked ? styles.scaleCheckmark : ''}`}
											isChecked={isChecked}
										/>
										<span className={styles.acknowledgementInfo}>
											<span className={styles.spanInfo1}>{item.info}</span>
											<span className={styles.spanInfo2}>{item.info2}</span>
										</span>
									</label>
								</li>
							)
						})}
					</ul>

					<form className={styles.deleteForm} onSubmit={e => confirmDeletion(e)}>
						<AccountInputBox
							id="confirmPassword"
							styles={styles}
							label="Confirm Password"
							value={confirmPassword}
							showPassword={true}
							onChangeInput={onChangeInput}></AccountInputBox>
						{errorMessage && (
							<APIResponseMessage responseMessage={errorMessage} meesageType="error">
								<WarnSVG className={styles.warnSVG} />
							</APIResponseMessage>
						)}
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
				</ProfileInfoBox>
			</div>
		</div>
	)
}

export default DeleteAccountTemplate
