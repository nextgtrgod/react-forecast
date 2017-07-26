import React from 'react';


function Icon(props) {
	return (
		<span className={'icon' + (props.classModifier ? ` icon--${props.classModifier}` : '')}>
			<i className={'wi ' +
				(props.status ? 
					'wi-owm-' +
					(props.dayTime ? `${props.status.dayTime}-` : '') + 
					`${props.status.statusID}`
					:
					''
				) +
				(props.direction ? `wi-direction-${props.direction}` : '') +
				(props.icon ? `wi-${props.icon}` : '')
				}>
			</i>
		</span>
	)
}


export default Icon;