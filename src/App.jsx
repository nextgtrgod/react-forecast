import React 	from 'react';
import ReactDOM from 'react-dom';

import './styles.styl';

import Search from './components/Search';
import Widget from './components/Widget';
import Forecast from './components/Forecast';
import parseData from './logic/parseData';
import get from './logic/get';

// import weatherData from './api/weatherData';



class App extends React.Component {
	constructor(props) {
		super(props);

		let lang = navigator.language.substring(0, 2) || 'en';

		this.state = {
			lang,
			lat: '',
			lng: ''
		}

		this.getWeatherData = this.getWeatherData.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}


	componentWillMount() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				console.log(position);
				this.getWeatherData(position.coords);
			});
		}
	}

	
	getWeatherData(value, searchBy) {
		let owmAppID = '77e577e4c9e13e85b8e39f71194aea31';

		let url = `http://api.openweathermap.org/data/2.5/forecast?` +
					`&lang=${this.state.lang}` +
					`&units=metric` +
					`&appid=${owmAppID}`;
		
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
			})
		});
	}


	handleSearchSubmit(lat, lng) {
		if((lat !== this.state.lat) || (lng !== this.state.lng)) {
			this.setState({
				lat,
				lng
			});

			this.getWeatherData({latitude: lat, longitude: lng});
		}
	}


	render() {
		return (
			<div className={'app'}>

				<Search
					data={this.state.cityData}
					onSubmit={this.handleSearchSubmit}
				/>

				{this.state.weatherDataNow &&
					<Widget
						data={this.state.weatherDataNow} 
						lang={this.state.lang}
					/>
				}

				{this.state.weatherDataNext &&
					<Forecast
						data={this.state.weatherDataNext}
						lang={this.state.lang}
					/>
				}

			</div>
		)
	}

}


ReactDOM.render(<App />, document.getElementById('root'));


// api.openweathermap.org/data/2.5/weather?q=Moscow,ru&lang=ru&units=metric&appid=77e577e4c9e13e85b8e39f71194aea31
// api.openweathermap.org/data/2.5/forecast?q=Москва,ru&appid=77e577e4c9e13e85b8e39f71194aea31&lang=ru&units=metric
// AIzaSyDUO2FX0I0WrBipHcGozv8_1UWNNHu_BFk
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Москва&types=(cities)&key=AIzaSyDUO2FX0I0WrBipHcGozv8_1UWNNHu_BFk