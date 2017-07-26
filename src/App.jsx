import React 	from 'react';
import ReactDOM from 'react-dom';

import './styles.styl';

import Search from './components/Search';
import Widget from './components/Widget';
import Forecast from './components/Forecast';
import parseData from './logic/parseData';

// import weatherData from './api/weatherData';



class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			language: 'ru'
		}

		this.getWeatherData = this.getWeatherData.bind(this);
	}


	componentWillMount() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				console.log(position);
				this.getWeatherData(position.coords);
			});
		}
	}

	
	getWeatherData(coords) {
		let appID = '77e577e4c9e13e85b8e39f71194aea31';

		let url = `http://api.openweathermap.org/data/2.5/forecast?` +
					`lat=${coords.latitude}&lon=${coords.longitude}&` +
					`lang=${this.state.language}&` +
					`units=metric&` +
					`appid=${appID}`;
		
	
		let xhr = new XMLHttpRequest();

		xhr.open('GET', url);

		xhr.onload = () => {
			if(xhr.status === 200) {
				let json = JSON.parse(xhr.response);

				if(json.cod == 200) {
					let parsedData = parseData(json);

					this.setState({
						weatherDataNow:  parsedData.now, 	// weather data for now
						weatherDataNext: parsedData.next, 	// array of weather data for next 5 days
						cityData: 		 parsedData.city 	// city info (id, country)
					})
				} else {
					console.log(json.cod + '\n' + json.message);
				}
			} else {
				reject(xhr.statusText);
			}
		};
		xhr.onerror = error => console.log(error);

		xhr.send();
	}


	render() {
		return (
			<div className={'app'}>

				<Search data={this.state.cityData} />

				{this.state.weatherDataNow &&
					<Widget
						data={this.state.weatherDataNow} 
						type='big' 
					/>
				}

				{this.state.weatherDataNext &&
					<Forecast data={this.state.weatherDataNext} />
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