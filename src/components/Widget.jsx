import React from 'react';

import Icon from './Icon';

import local from '../logic/local';


function Widget(props) {
	return (
		<div className={'widget' + (props.data.dayTime ? ` ${props.data.dayTime}` : '')}>

			<div className='widget__left'>
				<Icon
					status={{
							dayTime:  props.data.dayTime,
							statusID: props.data.statusID
						}}
				/>
				<p className="status">{props.data.statusDescription}</p>
			</div>

			<div className='widget__right'>
				<div className="widget__info">
					<p className='temp'>{props.data.temp}°</p>
					{(props.data.tempMin !== props.data.tempMax) && 
						(<p className='temp-range'>{props.data.tempMin}..{props.data.tempMax}°</p>)
					}
				</div>

				<div className="widget__info">
					<p title={local(0, 'humidity', props.lang)}>
						<Icon icon='raindrop'/>
						{props.data.humidity}
						<span>%</span> 
					</p>
					<p title={local(0, 'wind', props.lang)}>
						<Icon direction={props.data.windDirection}/>
						{props.data.windSpeed}
						<span> {local(0, 'speed-units', props.lang)}</span> 
					</p>
					<p title={local(0, 'pressure', props.lang)}>
						<Icon icon='thermometer'/>
						{props.data.pressure}
						<span> {local(0, 'pressure-units', props.lang)}</span>
					</p>
					<p title={local(0, 'clouds', props.lang)}>
						<Icon icon='cloud'/>
						{props.data.clouds}
						<span>%</span>
					</p>
				</div>

			</div>
		</div>
	)
};


export default Widget;