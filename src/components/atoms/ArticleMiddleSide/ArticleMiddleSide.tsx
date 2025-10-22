
interface ArticleMiddleSideProps {
  styles:{[key:string]:string}
}


const ArticleMiddleSide = ({styles}:ArticleMiddleSideProps) => {
  return (
    <div className={styles.articleMiddleSideContainer}>ArticleMiddleSide</div>
  )
}

export default ArticleMiddleSide