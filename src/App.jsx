import React 	from 'react';
import ReactDOM from 'react-dom';

import './styles.styl';

import Search from './components/Search';
import Widget from './components/Widget';
import parseData from './logic/parseData';

import weatherData from './api/weatherData';



class App extends React.Component {
	constructor(props) {
		super(props);

		let weatherDataCity = this.props.weatherData.city;
		let weatherDataList = this.props.weatherData.list;
	
		let weatherDataNow = weatherDataList[0];

		this.state = {
			weatherDataCity, 	// city info (id, country)
			weatherDataNow, 	// weather data for now
			// weatherDataNext 	// array of weather data for next 5 days
		}

		console.log(parseData(this.props.weatherData));
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


// api.openweathermap.org/data/2.5/weather?q=Moscow,ru&lang=ru&units=metric&appid=77e577e4c9e13e85b8e39f71194aea31
// api.openweathermap.org/data/2.5/forecast?q=Moscow,ru&appid=77e577e4c9e13e85b8e39f71194aea31&lang=ru&units=metric