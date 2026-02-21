import { type RefObject } from 'react'
import styles from './MiniMarkdownToolbar.module.scss'

interface MiniMarkdownToolbarProps {
	textareaRef: RefObject<HTMLTextAreaElement | null>
	value: string
	onChange: (v: string) => void
	className?: string
	isSubmitting?: boolean
}
type ToolbarButtonConfig = {
	label: string
	aria: string
	title: string
	before: string
	after?: string
}

type ToolbarGroup = {
	label: string
	buttons: ToolbarButtonConfig[]
}
const toolbarButtons: ToolbarGroup[] = [
	{
		label: 'Text formatting',
		buttons: [
			{ label: 'B', aria: 'Bold text', title: 'Bold (Ctrl+B)', before: '**', after: '**' },
			{ label: 'I', aria: 'Italic text', title: 'Italic (Ctrl+I)', before: '*', after: '*' },
		],
	},
	{
		label: 'Headings',
		buttons: [
			{ label: 'H2', aria: 'Heading level 2', title: 'Heading 2', before: '## ' },
			{ label: 'H3', aria: 'Heading level 3', title: 'Heading 3', before: '### ' },
		],
	},
	{
		label: 'Content structure',
		buttons: [
			{ label: '•', aria: 'Bulleted list', title: 'Bulleted list', before: '- ' },
			{ label: '1.', aria: 'Numbered list', title: 'Numbered list', before: '1. ' },
			{ label: '“', aria: 'Blockquote', title: 'Quote', before: '> ' },
			{ label: '―', aria: 'Horizontal rule', title: 'Divider', before: '\n\n---\n\n' },
		],
	},
	{
		label: 'Links and media',
		buttons: [{ label: 'Link', aria: 'Insert link', title: 'Link', before: '[', after: '](url)' }],
	},
]

const MiniMarkdownToolbar = ({ textareaRef, className, value, isSubmitting, onChange }: MiniMarkdownToolbarProps) => {
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
		<div className={`${styles.miniMarkdownWrapper} ${className ? className : ''}`}>
			<div className={styles.markdownToolbar} role="toolbar" aria-label="Content editor toolbar">
				{toolbarButtons.map((group, index) => (
					<div key={group.label}>
						<div role="group" aria-label={group.label} className={styles.markdownButtonBox}>
							{group.buttons.map((btn,idx) => (
								<button
								key={idx}
									type="button"
									aria-label={btn.aria}
									title={btn.title}
									disabled={isSubmitting}
									onClick={() => insert(btn.before, btn.after ?? '')}
									className={styles.markdownButton}>
									{btn.label}
								</button>
							))}
						</div>
						{index < toolbarButtons.length - 1 && <div role="separator" aria-orientation="vertical" />}
					</div>
				))}

			</div>
		</div>
	)
}

export default MiniMarkdownToolbar
