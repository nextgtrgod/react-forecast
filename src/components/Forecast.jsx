import React from 'react';

import Widget from './Widget';


function Forecast(props) {
	return (
		<div className='forecast'>
			{props.data.map(dataItem => 
				<Widget
					data={dataItem}
					type='small' 
				/>
			)}
		</div>
	)
};


export default Forecast;