const normalizeText = (text: string) =>
	text
		.replace(/[„”"]/g, '"') // cudzysłowy
		.replace(/[–—]/g, '') // myślniki
		.replace(/\s+/g, ' ') // wielokrotne spacje
		.trim()
// const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const highlightText = (text: string, search: string) => {
	if (!search) return text
	const normalizedText = normalizeText(text)
	const normalizedSearch = normalizeText(search)

	// const safeSearch = escapeRegExp(search)
	const regex = new RegExp(`(${normalizedSearch})`, 'gi')

	const parts = normalizedText.split(regex)
	// regex.test(part)
	// part.match(regex)
	return parts.map((part,index)=> (
        part.match(regex) ? <mark key={index}>{part}</mark> : part
	))
}

export { highlightText }
