const dateConverter = ():[string, Intl.DateTimeFormatOptions] => {
	return [

        'pl-Pl',
		{
            day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}
    ]
	
}

export default dateConverter
