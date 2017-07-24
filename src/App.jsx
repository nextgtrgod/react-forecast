import React 	from 'react';
import ReactDOM from 'react-dom';

import './styles.styl';

import Search from './components/Search';
import Widget from './components/Widget';

import weatherData from './api/weatherData';



class App extends React.Component {
	constructor(props) {
		super(props);

		let weatherDataCity = this.props.weatherData.city;
		let weatherDataList = this.props.weatherData.list;
	
		let weatherDataNow = weatherDataList[0];
		let weatherDataNext = [];

		// weatherDataList.forEach(weatherDataListItem => {
			
		// });

		this.state = {
			weatherDataCity, 	// city info (id, country)
			weatherDataNow, 	// weather data for now
			weatherDataNext 	// array of weather data for next 5 days
		}

		console.log(this.state.weatherDataNow);
	}

	render() {
		return (
			<div className={'app'}>

				<Search cityData={this.state.weatherDataCity} />

				<Widget weatherData={this.state.weatherDataNow} widgetType='main' />

			</div>
		)
	}

}


ReactDOM.render(<App weatherData={weatherData}/>, document.getElementById('root'));