import React from 'react';

import Icon from './Icon';


function Widget(props) {
	return (
		<div className={'widget' + ` ${props.type}` + (props.data.dayTime ? ` ${props.data.dayTime}` : '')}>

			<div className='widget__left'>
				<Icon
					classModifier={props.type}
					status={{
							dayTime:  props.data.dayTime,
							statusID: props.data.statusID
						}}
				/>
				{props.type === 'big' ? 
					<p className="status">{props.data.statusDescription}</p>
					:
					''
				}
			</div>

			<div className='widget__right'>
				<div className="widget__info">
					{props.type === 'big' ?
						<p className='temp'>{props.data.temp}°</p>
						:
						''
					}
	
					<p className='temp-range'>{props.data.tempMin}..{props.data.tempMax}°</p>
				</div>

				
				{props.type === 'big' ?
					<div className="widget__info">
						<p>
							<Icon icon='raindrop'/>
							{props.data.humidity}
							<span>%</span> 
						</p>
						<p>
							<Icon direction={props.data.windDirection}/>
							{props.data.windSpeed} 
							<span> м/c</span> 
						</p>
						<p>
							<Icon icon='thermometer'/>
							{props.data.pressure}
							<span> мм. рт. ст.</span>
						</p>
						<p>
							<Icon icon='cloud'/>
							{props.data.clouds}
							<span>%</span>
						</p>
					</div>
					:
					''
				}

			</div>
		</div>
	)
};


export default Widget;