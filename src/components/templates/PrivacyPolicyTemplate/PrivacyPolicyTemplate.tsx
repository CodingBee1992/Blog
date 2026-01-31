import styles from './PrivacyPolicyTemplate.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import AnchorLink from '../../atoms/AnchorLink/AnchorLink'
const PrivacyPolicyTemplate = () => {
	const markdownText = `# Terms & Conditions

**Last updated:** [dd/mm/yyyy]

## 1. General provisions
1. These Terms & Conditions define the rules for using the **[blog name]** website available at **[website address]**.  
2. The owner and administrator of the website is **[Your name / company name]**, contact: **[email address]**.  
3. Using the website means acceptance of these Terms & Conditions.

## 2. Rules of use
1. Users agree to use the website in a lawful manner and in accordance with good practices and these Terms.  
2. It is prohibited to publish content that:
   - is illegal,
   - offensive, abusive, or hateful,
   - infringes personal rights or copyrights of third parties,
   - constitutes spam or unauthorized advertising.

## 3. Comments
1. Users may post comments under blog articles.  
2. Comment authors are fully responsible for their content.  
3. The administrator reserves the right to:
   - moderate comments,
   - remove comments violating these Terms,
   - restrict commenting privileges for selected users.

## 4. Likes
1. The website allows users to express reactions (likes) to published content.  
2. Likes are for informational purposes only and have no legal effect.  
3. The administrator may remove abuses related to the liking system.

## 5. Copyright
1. All content published on the website (texts, graphics, materials) is the property of the administrator or used under appropriate licenses.  
2. Copying, distributing, or using content without prior consent is prohibited, except as permitted by law.

## 6. Liability
1. The administrator makes every effort to ensure that the content is accurate and up to date but is not responsible for errors or outdated information.  
2. The administrator is not responsible for content posted by users in comments.

## 7. Personal data
Rules for processing personal data are described in the **Privacy Policy** available on the website.

## 8. Final provisions
1. The administrator reserves the right to amend these Terms & Conditions.  
2. The current version of the Terms is always available on the website.`

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

export default PrivacyPolicyTemplate
