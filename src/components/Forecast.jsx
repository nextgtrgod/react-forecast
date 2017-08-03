import React from 'react';

import Icon from './Icon';

import local from '../logic/local';


function Forecast(props) {
	return (
		<div className='forecast'>
			{props.data.map((dataItem, index) => 
				<div className='forecast__item' key={index}>
					<Icon
						classModifier={props.type}
						status={{
								dayTime:  dataItem.dayTime || 'day',
								statusID: dataItem.statusID
							}}
					/>
					<p className='weekday'>{local(dataItem.day, 'weekday-short', props.lang)}</p>

					<p className='date'>
						{dataItem.date} 
						<span> {local(dataItem.month, 'month-long', props.lang)}</span>
					</p>

					<p className='temp-range'>{dataItem.tempMin}..{dataItem.tempMax}°</p>
				</div>
			)}
		</div>
	)
};


export default Forecast;