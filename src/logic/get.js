

function get(url, callback) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', url);

	xhr.onload = () => {
		if(xhr.status === 200) {
			try {
				let json = JSON.parse(xhr.response);
				callback(json);

			} catch (error) {
				console.error(error);
			}

		} else {
			console.log(xhr.status);
		}
	};
	xhr.onerror = event => console.log(event.target.status);
	xhr.send();
}


export default get;