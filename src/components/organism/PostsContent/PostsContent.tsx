import type { PostDataProps } from '../../../types/types'
import postData from '../../../utils/postData'
import Article from '../../atoms/Article/Article'
import styles from './PostsContent.module.scss'

const PostsContent = () => {
	const test =(e)=>{
		console.log(e.target);
	}
	return (
		<section className={styles.postsContainer}>

			<div className={styles.articleContainer}>
				<div className={styles.articleWrapper}>
					<div className={styles.lines} onClick={e => test(e)}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				{postData.map(({title,href,image,categories,author,text}:PostDataProps,index:number)=>{
					return <Article key={index} href={href} image={image} title={title} categories={categories} author={author} text={text}/>
				})}
				</div>
			</div>

			<div className={styles.paginationContainer}>
				<button className={styles.controlBtn}>Prev</button>
				<div className={styles.paginationButtons}>
					<button>1</button>
					<button>2</button>
					<button>3</button>
					<button>4</button>
					<button>5</button>
					<button>6</button>
				</div>
				<button className={styles.controlBtn}>Next</button>
			</div>
		</section>
	)
}

export default PostsContent
