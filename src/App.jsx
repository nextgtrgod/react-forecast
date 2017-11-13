import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.styl';

import Search from './components/Search';
import Widget from './components/Widget';
import Forecast from './components/Forecast';

import { apiKey } from './api/key';
import get from './logic/get';
import parseData from './logic/parseData';


class App extends React.Component {
	constructor(props) {
		super(props);

		let lang = navigator.language.toLocaleLowerCase().substring(0, 2) || 'en';

		this.state = {
			lang,
			lat: '',
			lng: ''
		}
	}

	componentWillMount() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.getWeatherData(position.coords);
			});
		}
	}

	
	getWeatherData = (value, searchBy) => {
		let url = `https://api.openweathermap.org/data/2.5/forecast?` +
					`&lang=${this.state.lang}` +
					`&units=metric` +
					`&appid=${apiKey}`;
		
		switch (searchBy) {
			case 'byName':
				url += `&q=${value.name},ru`;
				break;
			default:
				url += `&lat=${value.latitude}&lon=${value.longitude}`;
				break;
		}

		get(url, json => {
			let parsedData = parseData(json, this.state.lang);

			this.setState({
				weatherDataNow:  parsedData.now, 	// weather data for now
				weatherDataNext: parsedData.next, 	// array of weather data for next 5 days
				cityData: 		 parsedData.city 	// city info (id, country)
			});
		});
	}


	handleSearchSubmit = (lat, lng) => {
		if((lat !== this.state.lat) || (lng !== this.state.lng)) {
			this.setState({
				lat,
				lng
			});
			this.getWeatherData({latitude: lat, longitude: lng});
		}
	}


	render() {
		return [
			<Search
				key='search'
				data={this.state.cityData}
				onSubmit={this.handleSearchSubmit}
			/>,
	
			this.state.weatherDataNow && (
				<Widget
					key='widget'
					data={this.state.weatherDataNow} 
					lang={this.state.lang}
				/>
			),
	
			this.state.weatherDataNext && (
				<Forecast
					key='forecast'
					data={this.state.weatherDataNext}
					lang={this.state.lang}
				/>
			)
		]
	}
}


ReactDOM.render(<App />, document.getElementById('app'));