import React from 'react';


class Search extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			lat: '',
			lng: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}

	componentDidMount() {
		let input = document.getElementById('autocomplete');
		console.log('found input: ' + input);

		let autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});

  		google.maps.event.addListener(autocomplete, 'place_changed', () => {
			let place = autocomplete.getPlace();

			this.setState({
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			});

			if(lat && lng) {
				this.props.onSubmit(lat, lng);
			};

			// console.log(place + '\n' + place.geometry.location.lat() + ' -- ' + place.geometry.location.lng());
      	});
	}


	handleSubmit(event) {
		event.preventDefault();

		let lat = this.state.lat;
		let lng = this.state.lng;

		if(lat && lng) {
			this.props.onSubmit(lat, lng);
		}
	}


	handleFocus(event) {
		event.currentTarget.select();
	}


	render() {
		return (
			<form className='search-form' onSubmit={this.handleSubmit}>
				<input
					id='autocomplete'
					type='text' 
					onFocus={this.handleFocus}
				/>

				<button type='submit'>
					<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				</button>
			</form>
		)
	}
}


export default Search;