

function local(value, dataType) {
	let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	
	if (dataType === 'month') {
		return months[value];
	}

	return 'unknown data type';
};


export default local;