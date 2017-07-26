

function local(value, dataType, lang = 'en') {
	let localData = {
		'en': {
			'weekday-long':  	['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
			'weekday-short': 	['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'],
			'month-long': 		['january', 'february', 'march', 'aril', 'may', 'june', 'july', 'august	', 'september', 'october', 'november', 'december'],
			'month-short':  	['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec']
		},
		'ru': {
			'weekday-long': 	['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
			'weekday-short': 	['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
			'month-long': 		['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
			'month-short': 		['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
		}
	};
	
	return localData[lang][dataType][value];
};


export default local;