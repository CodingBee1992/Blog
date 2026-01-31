import styles from './TermsAndConditionsTemplate.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
const TermsAndConditionsTemplate = () => {
	const markdownText = `# Privacy Policy

**Last updated:** [dd/mm/yyyy]

## 1. General information
This Privacy Policy describes how personal data of users of the **[blog name]** website, available at **[website address]**, is processed.

The data controller is:  
**[Your name / company name]**  
Email contact: **[email address]**

## 2. Scope of collected data
Depending on how you use the website, we may process the following data:
- name and/or nickname,
- email address,
- IP address,
- data included in messages sent via contact forms,
- data collected automatically through cookies and similar technologies.

## 3. Purpose of data processing
Personal data is processed for the purpose of:
- handling contact form inquiries,
- publishing and moderating comments,
- sending newsletters (if consent is given),
- ensuring proper operation of the website,
- analytical and statistical purposes.

## 4. Legal basis for processing
Personal data is processed based on:
- Article 6(1)(a) GDPR – user consent,
- Article 6(1)(f) GDPR – legitimate interest of the controller.

## 5. Data sharing
Personal data is not sold or shared with third parties, except for service providers supporting the website (e.g. hosting providers, mailing systems), based on data processing agreements.

## 6. User rights
Users have the right to:
- access their personal data,
- rectify their data,
- erase their data,
- restrict processing,
- data portability,
- withdraw consent at any time,
- lodge a complaint with a supervisory authority.

## 7. Cookies and Cookie Consent
The website uses cookies and similar technologies to ensure proper operation of the website and for analytical purposes.

Cookies may be used to:
- maintain user sessions,
- remember user preferences,
- collect anonymous statistical data.

Upon the first visit to the website, users are informed about the use of cookies through a cookie consent banner. Users may:
- accept all cookies,
- reject non-essential cookies,
- manage their cookie preferences.

Consent for the use of cookies can be withdrawn at any time by changing browser settings or cookie preferences available on the website.

## 8. Cookie management
Users can manage or disable cookies at any time through their web browser settings. Disabling cookies may affect some functionalities of the website.

## 9. Changes to the Privacy Policy
The controller reserves the right to make changes to this Privacy Policy. The current version will always be available on the website.`

	return (
		<div className={styles.markdown}>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
			<div style={{ marginTop: '2rem', textAlign: 'center' }}>
				<p>If you have any questions or concerns, please contact us.</p>
				<AnchorLink href="/contact" className="contact-button">
					Contact with us
				</AnchorLink>
			</div>
		</div>
	)
}

export default TermsAndConditionsTemplate
