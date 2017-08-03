import React from 'react';


function Icon(props) {

	let dayTime;
	if(props.status) {
		dayTime = props.status.dayTime || '';
	} 

	return (
		<span className='icon'>

			{props.status && (
				<i className={`wi wi-owm-${dayTime}-${props.status.statusID}`}></i>
			)}

			{props.direction && (
				<i className={`wi wi-direction-${props.direction}`}></i>
			)}

			{props.icon && (
				<i className={`wi wi-${props.icon}`}></i>
			)}

		</span>
	)
}


export default Icon;