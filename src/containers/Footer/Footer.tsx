import styles from './Footer.module.scss'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AnchorLink from '../../components/atoms/AnchorLink/AnchorLink'
import useSocialLinks from '../../hooks/useSocialLinks'
import SocialIcon from '../../components/atoms/SocialIcon/SocialIcon'
import useFooterSiteLinks from '../../hooks/useFooterSiteLinks'
const newsLetterSchema = z.object({
	email: z.email(),
})
type newsLetterTypes = z.infer<typeof newsLetterSchema>
const Footer = () => {
	const year = new Date().getFullYear()
	const { socialLinks } = useSocialLinks()
	const { siteLinks } = useFooterSiteLinks()
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<newsLetterTypes>({
		mode: 'onSubmit',
		resolver: zodResolver(newsLetterSchema),
		defaultValues: {
			email: '',
		},
	})
	const onSubmit: SubmitHandler<newsLetterTypes> = async data => {
		try {
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<footer className={styles.footerContainer}>
			<div className={styles.footerMain}>
				<div className={`${styles.grid} row`}>
					<div className={`${styles.footerInfo} ${styles.column}`}>
						<h2>About our Site</h2>
						<p className={styles.footerText}>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi et quisquam, rerum provident facilis
							asperiores nesciunt nihil nemo, ea, minus totam accusantium quaerat quam hic. Voluptatibus laborum
							quibusdam amet vel!
						</p>
					</div>
					<div className={`${styles.footerSiteLinks} ${styles.column}`}>
						<h2>Site Links</h2>
						<ul className={styles.footerList}>
							{siteLinks.map(link => {
								return (
									<li key={link.name}>
										<AnchorLink href={link.url}>{link.name}</AnchorLink>
									</li>
								)
							})}
						</ul>
					</div>
					<div className={`${styles.footerSocialLinks} ${styles.column}`}>
						<h2>Follow Us</h2>
						<ul className={styles.footerList}>
							{socialLinks.map(social => {
								return (
									<SocialIcon key={social.name} social={social} styles={styles}>
										{social.name}
									</SocialIcon>
								)
							})}
						</ul>
					</div>
					<div className={`${styles.footerSubscribe} ${styles.column}`}>
						<h2>Sign Up For Newsletter</h2>
						<p>Signup to get updates on articles, interviews and events.</p>
						<div className={styles.subscribeForm}>
							<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
								<input {...register('email')} type="email" name="email" id="email" placeholder="Your email Address" />
								{errors.email && <div>{errors.email.message}</div>}
								<button disabled={isSubmitting} type="submit">
									Subscribe
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.footerBottom}>
				<div className={`${styles.column} row`}>
					<span className={styles.copyright}>&copy; Copyright CoderBee {year}</span>
					<span className={styles.copyright}>
						Design by{' '}
						<a href="https://www.styleshout.com/" target="_blank" rel="noopener noreferrer">
							StyleShout
						</a>
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
