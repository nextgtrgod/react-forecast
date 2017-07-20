import React 	from 'react';
import ReactDOM from 'react-dom';

import './styles.styl';

import Search from './components/Search';
import Forecast from './components/Forecast';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<div className={'app'}>
				<Search />

				<Forecast
					currentTemp={26}
					minTemp={11}
					maxTemp={31}
					humidity={72}
					windDirection={'up-right'}
					windSpeed={'3'}
					pressure={760}
				/>


			</div>
		)
	}

}


ReactDOM.render(<App />, document.getElementById('root'));