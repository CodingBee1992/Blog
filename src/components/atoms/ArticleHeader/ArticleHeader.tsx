import type { ArticleContentProps } from "../../../types/types"



const ArticleHeader = ({title}:ArticleContentProps) => {

 

  return (
    <div>{title}</div>
  )
}

export default ArticleHeader