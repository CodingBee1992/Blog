import { type RefObject } from 'react'
import styles from './MiniMarkdownToolbar.module.scss'

interface MiniMarkdownToolbarProps {
	textareaRef: RefObject<HTMLTextAreaElement | null>
	value: string
	onChange: (v: string) => void
	className?:string
	
}

const MiniMarkdownToolbar = ({ textareaRef,className, value, onChange }: MiniMarkdownToolbarProps) => {
	const insert = (before: string, after = '') => {
		const textarea = textareaRef.current
		if (!textarea) return

		const start = textarea.selectionStart
		const end = textarea.selectionEnd

		const selectedText = value.slice(start, end)
		const newText = value.slice(0, start) + before + (selectedText || '') + after + value.slice(end)

		onChange(newText)

		// przywrócenie kursora
		setTimeout(() => {
			textarea.focus()
			textarea.selectionStart = start + before.length
			textarea.selectionEnd = start + before.length + selectedText.length
		}, 0)
	}
	return (
		<div className={`${styles.miniMarkdownWrapper} ${className ? className :''}`}>
			<div className={styles.markdownToolbar} role="toolbar" aria-label="Content editor toolbar">
				{/* TEXT */}
				<div role="group" aria-label="Text formatting" className={styles.markdownButtonBox}>
					<button type="button" aria-label="Bold text" title="Bold (Ctrl+B)"  onClick={() => insert('**', '**')} className={styles.markdownButton}>
						B
					</button>

					<button type="button" aria-label="Italic text" title="Italic (Ctrl+I)" onClick={() => insert('*', '*')} className={styles.markdownButton}>
						I
					</button>
				</div>

				<div role="separator" aria-orientation="vertical" />

				
				<div role="group" aria-label="Headings" className={styles.markdownButtonBox}>
					<button type="button" aria-label="Heading level 2" title="Heading 2" onClick={() => insert('## ')} className={styles.markdownButton}>
						H2
					</button>

					<button type="button" aria-label="Heading level 3" title="Heading 3" onClick={() => insert('### ')} className={styles.markdownButton}>
						H3
					</button>
				</div>

				<div role="separator" aria-orientation="vertical" />

				
				<div role="group" aria-label="Content structure" className={styles.markdownButtonBox}>
					<button type="button" aria-label="Bulleted list" title="Bulleted list" onClick={() => insert('- ')} className={styles.markdownButton}>
						•
					</button>

					<button type="button" aria-label="Numbered list" title="Numbered list" onClick={() => insert('1. ')} className={styles.markdownButton}>
						1.
					</button>

					<button type="button" aria-label="Blockquote" title="Quote" onClick={() => insert('> ')} className={styles.markdownButton}>
						“
					</button>

					<button type="button" aria-label="Horizontal rule" title="Divider" onClick={() => insert('\n\n---\n\n')} className={styles.markdownButton}>
						―
					</button>
				</div>

				<div role="separator" aria-orientation="vertical" />

				
				<div role="group" aria-label="Links and media" className={styles.markdownButtonBox}>
					<button type="button" aria-label="Insert link" title="Link" onClick={() => insert('[', '](url)')} className={styles.markdownButton}>
						Link
					</button>

				</div>
			</div>
		</div>
	)
}

export default MiniMarkdownToolbar
