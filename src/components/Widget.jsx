import React from 'react';

import Icon from './Icon';


function Widget(props) {
	let O = n => Math.round(n); // helper

	let weatherData = props.weatherData;
	let dayTime 	= (weatherData.sys.pod === 'd') ? 'day' : 'night';
	let temp 		= O(weatherData.main.temp);
	let tempMin 	= O(weatherData.main.temp_min);
	let tempMax 	= O(weatherData.main.temp_max);
	let humidity 	= O(weatherData.main.humidity);
	let pressure 	= O(weatherData.main.pressure / 1.33322368);
	let windSpeed 	= O(weatherData.wind.speed);
	let windDeg 	= O(parseFloat(weatherData.wind.deg));
	let windDirection = '';

	switch (windDeg) {
		case 0:
		case 360:
			windDirection = 'up';
			break;
		case 90:
			windDirection = 'left';
			break;
		case 180:
			windDirection = 'down';
			break;
		case 270:
			windDirection = 'left';
			break;
		default:
			if(windDeg > 0   && windDeg < 90)  windDirection = 'up-right';
			if(windDeg > 90  && windDeg < 180) windDirection = 'down-right';
			if(windDeg > 180 && windDeg < 270) windDirection = 'down-left';
			if(windDeg > 270 && windDeg < 360) windDirection = 'up-left';
	}


	return (
		<div className={'widget' + (props.widgetType ? ` ${props.widgetType}` : '') + ` ${dayTime}`}>
			
			<div className='widget__left'>
				<Icon
					classModifier='big'
					status={{
							dayTime,
							statusID: weatherData.weather[0].id
						}}
				/>
				<p className="status">{weatherData.weather[0].description}</p>
			</div>

			<div className='widget__right'>
				<div className="widget__info">
					<p className='temp'>{temp}°</p>
	
					<p className='temp-range'>{tempMin}..{tempMax}°</p>
				</div>

				{/* {
					false ? <div>Hello</div> : ''
				} */}
				<div className="widget__info">
					<p>
						<Icon icon='raindrop'/>
						{humidity}
						<span>%</span> 
					</p>
					<p>
						<Icon direction={windDirection}/>
						{windSpeed} 
						<span> м/c</span> 
					</p>
					<p>
						<Icon icon='thermometer'/>
						{pressure}
						<span> мм. рт. ст.</span>
					</p>
					<p>
						<Icon icon='cloud'/>
						{weatherData.clouds.all}
						<span>%</span>
					</p>
				</div>

			</div>
		</div>
	)
};


export default Widget;