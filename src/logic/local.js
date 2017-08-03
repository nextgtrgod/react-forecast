
export default function local(value, dataType, lang = "en") {

	let localData = {
		"en": {
			"weekday-long":  	["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
			"weekday-short": 	["su", "mo", "tu", "we", "th", "fr", "sa"],
			"month-long": 		["january", "february", "march", "aril", "may", "june", "july", "august	", "september", "october", "november", "december"],
			"month-short":  	["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"],
			"humidity": 		["humidity"],
			"wind": 			["wind and speed direction"],
			"pressure": 		["pressure"],
			"pressure-units": 	["mmHg"],
			"speed-units": 		["m/s"],
			"clouds": 			["cloudiness"]
		},
		"ru": {
			"weekday-long": 	["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"],
			"weekday-short": 	["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
			"month-long": 		["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
			"month-short": 		["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
			"humidity": 		["влажность"],
			"wind": 			["направление и скорость ветра"],
			"pressure": 		["давление"],
			"pressure-units": 	["мм. рт. ст."],
			"speed-units": 		["м/с"],
			"clouds": 			["облачность"]
		}
	};
	
	return localData[lang][dataType][value];
};