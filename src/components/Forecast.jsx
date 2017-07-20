import React from 'react';

import Icon from './Icon';


function Forecast(props) {
	return (
		<div className={'forecast' + (props.widgetSize ? ` ${props.widgetSize}` : '')}>
			<Icon classModifier='main' status={{dayTime: 'night', statusID: 803}} />

			<div className="forecast__info">
				<div className="forecast__info--main">
					<p className='current-temp'>{props.currentTemp}°</p>

					<p className='temp-range'>{props.minTemp}..{props.maxTemp}°</p>
				</div>

				<div className="forecast__info--additional">
					<p> <Icon icon='raindrop'/> {props.humidity}% </p>
					<p> <Icon direction={props.windDirection}/> {props.windSpeed} м/c </p>
					<p> <Icon icon='thermometer'/> {props.pressure} мм. рт. ст. </p>
				</div>
			</div>
		</div>
	)
}


export default Forecast;