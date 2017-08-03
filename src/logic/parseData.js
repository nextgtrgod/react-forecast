

function parseData(data, lang = 'en') {
	// helpers
	let O = n => Math.round(n);

	let convert = t => {
		let date = new Date(t);
		return {
			hour: 	date.getUTCHours(),
			day: 	date.getUTCDay(),
			date: 	date.getUTCDate(),
			month: 	date.getUTCMonth(),
			year: 	date.getUTCFullYear()
		}
	};
	
	console.log(data);
	
	let weatherData = [];

	data.list.forEach(item => {
		
		let dateConverted = convert(item.dt * 1000);

		let weatherDataItem = {
			day 				: dateConverted.day,
			date 				: dateConverted.date,
			month 				: dateConverted.month,
			year 				: dateConverted.year,
			dayTime 			: ((dateConverted.hour > 6 && dateConverted.hour < 21) ? 'day': 'night'),
			statusID 			: item.weather[0].id,
			statusDescription  	: item.weather[0].description,
			temp 				: O(item.main.temp),
			tempMin 			: O(item.main.temp_min),
			tempMax 			: O(item.main.temp_max),
			humidity 			: O(item.main.humidity),
			pressure 			: O(item.main.pressure / 1.33322368),
			windSpeed 			: O(item.wind.speed),
			clouds 				: item.clouds.all
		};

		switch (data.list[0].wind.deg) {
			case 0:
			case 360:
				weatherDataItem.windDirection = 'up';
				break;
			case 90:
				weatherDataItem.windDirection = 'left';
				break;
			case 180:
				weatherDataItem.windDirection = 'down';
				break;
			case 270:
				weatherDataItem.windDirection = 'left';
				break;
			default:
				if(data.list[0].wind.deg > 0   && data.list[0].wind.deg < 90)  weatherDataItem.windDirection = 'up-right';
				if(data.list[0].wind.deg > 90  && data.list[0].wind.deg < 180) weatherDataItem.windDirection = 'down-right';
				if(data.list[0].wind.deg > 180 && data.list[0].wind.deg < 270) weatherDataItem.windDirection = 'down-left';
				if(data.list[0].wind.deg > 270 && data.list[0].wind.deg < 360) weatherDataItem.windDirection = 'up-left';
		};
	
		weatherData.push(weatherDataItem);
	});

	// get current date and waetherData for that date
	let currentDate = weatherData[0].date;

	// calculate min and max for today
	let weatherDataToday = weatherData.filter(item => item.date === currentDate);
	let todayTempMin = weatherDataToday[0].temp;
	let todayTempMax = weatherDataToday[0].temp;

	weatherDataToday.forEach(item => {
		if(item.temp < todayTempMin) todayTempMin = item.temp;
		if(item.temp > todayTempMax) todayTempMax = item.temp;
	});

	weatherData[0].tempMin = todayTempMin;
	weatherData[0].tempMax = todayTempMax;

	// return complete data for now widget
	let weatherDataNow = weatherData[0];


	// filter other dates
	let weatherDataNextDays = weatherData.filter(item => item.date !== currentDate);

	// get list of next dates
	let dates = [];
	weatherDataNextDays.forEach(item => {
		if (dates.indexOf(item.date) === -1) {
			dates.push(item.date);
		}
	});


	// group 3hour forecasts by date
	let groupByDate = [];
	for(let i = 0; i < dates.length; i++) {
		groupByDate.push(weatherDataNextDays.filter(item => item.date === dates[i]));
	};


	// calculate average min and max temp in every group
	let forecast = [];
	groupByDate.forEach(item => {

		let tempMin = item[0].temp;
		let tempMax = item[0].temp;

		let freq = {};
		let max = 0;
		let mostFreqStatusID;
		
		for(let i = 0; i < item.length; i++) {
			if(item[i].temp < tempMin) tempMin = item[i].temp;
			if(item[i].temp > tempMax) tempMax = item[i].temp;

			freq[item[i].statusID] = (freq[item[i].statusID] || 0) + 1;
		
			if(freq[item[i].statusID] > max) {
				max = freq[item[i].statusID];
				mostFreqStatusID = item[i].statusID;
			}

		};

		let forecastItem = {
			day: 		item[0].day,
			date: 		item[0].date,
			month: 		item[0].month,
			statusID: 	mostFreqStatusID,
			tempMin,
			tempMax
		};

		forecast.push(forecastItem);
	});

	let parsedData = {
		now:  weatherDataNow,
		next: forecast,
		city: data.city
	};

	return parsedData;
};


export default parseData;