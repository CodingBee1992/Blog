import type { SocialProps } from '../types/types'

import  Facebook from '../assets/icons/social/Facebook'
import  Twitter  from '../assets/icons/social/Twitter'
import  Instagram  from '../assets/icons/social/Instagram'
import  Dribbble  from '../assets/icons/social/Dribbble'


const faceBook: SocialProps = {
	path: 'https://www.facebook.com/',
	icon: <Facebook /> ,
}

const twitter:SocialProps  = {
	path: 'https://x.com',
	icon: <Twitter/>,
}

const instagram:SocialProps = {
	path: 'https://instagram.com',
	icon: <Instagram/> ,
}

const dribbble:SocialProps = {
	path: 'https://dribbble.com/',
	icon: <Dribbble />,
}

export const socialData: SocialProps[] = [faceBook, twitter, instagram, dribbble]
