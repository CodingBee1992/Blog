import styles from './TermsAndConditionsTemplate.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
import { useFetchLegalDocumentsQuery } from '../../../slices/api/legalDocumentsApi'
const TermsAndConditionsTemplate = () => {
	const { data } = useFetchLegalDocumentsQuery({ type: 'terms_and_conditions' })

	const markdownText = data ? data.content : ''

	return (
		<div className={styles.termsAndConditionsContainer}>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
			<div className={styles.contactUs}>
				<p className={styles.contactUsInfo}>If you have any questions or concerns, please contact us.</p>
				<AnchorLink href="/contact" className={styles.contactUsButton}>
					Contact with us
				</AnchorLink>
			</div>
		</div>
	)
}

export default TermsAndConditionsTemplate
