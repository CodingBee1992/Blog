import styles from './Footer.module.scss'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AnchorLink from '../../components/atoms/AnchorLink/AnchorLink'
const newsLetterSchema = z.object({
	email: z.email(),
})
type newsLetterTypes = z.infer<typeof newsLetterSchema>
const Footer = () => {
	const year = new Date().getFullYear()

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
						<h5>About our Site</h5>
						<p className={styles.footerText}>
							Every day with Rico and Jumbo is an adventure. Rico, faster than a shadow and always first at the bowl, is
							a dog with the energy of a rocket and a heart as big as a barn. Jumbo, on the other hand, is bigger,
							calmer, but with the expression of a philosopher—he prefers to observe the world from a distance... unless
							{/* someone is scraping food off their plate 😄 Together, they make the perfect pair: Rico gets the action
							going, Jumbo takes care of it. One bark from Rico, one look from Jumbo – and you know something's up. And
							the worst thing you can do? Try to eat something around them. Good luck.  */}
						</p>
					</div>
					<div className={`${styles.footerSiteLinks} ${styles.column}`}>
						<h5>Site Links</h5>
						<ul>
							<li>
								<AnchorLink href="/about">About us</AnchorLink>
							</li>

							<li>
								<AnchorLink href="/faq">FAQ</AnchorLink>
							</li>
							<li>
								<AnchorLink href="/terms-and-conditions">Terms</AnchorLink>
							</li>
							<li>
								<AnchorLink href="/privacy-policy">Privacy Police</AnchorLink>
							</li>
						</ul>
					</div>
					<div className={`${styles.footerSocialLinks} ${styles.column}`}>
						<h5>Follow Us</h5>
						<ul>
							<li>
								<a href="#">Twitter</a>
							</li>
							<li>
								<a href="#">Facebook</a>
							</li>
							<li>
								<a href="#">Dribbble</a>
							</li>
							<li>
								<a href="#">Pinterest</a>
							</li>
							<li>
								<a href="#">Instagram</a>
							</li>
						</ul>
					</div>
					<div className={`${styles.footerSubscribe} ${styles.column}`}>
						<h5>Sign Up For Newsletter</h5>
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
					<span className={styles.copyright}>&copy; Copyright CodingBee {year}</span>
					<span className={styles.copyright}>
						Design by{' '}
						<a href="https://www.styleshout.com/" target="_blank">
							StyleShout
						</a>
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
