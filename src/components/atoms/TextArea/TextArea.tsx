import type { Dispatch, SetStateAction } from "react"

interface TextAreaProps {
	styles: Record<string,string>
    
    setShowReply: Dispatch<SetStateAction<boolean>>
}

const TextArea = ({ styles,setShowReply }: TextAreaProps) => {
	return (
		<div>
			<textarea className={styles.commentTextArea} name="comment" placeholder="Add comment" id=""></textarea>
            <button>Reply</button>
            <button onClick={()=> setShowReply(false)}>Cancel</button>
		</div>
	)
}

export default TextArea
