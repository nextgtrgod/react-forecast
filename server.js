const path 			= require('path');
const fs 			= require('fs');
const express 		= require('express');
const MongoClient 	= require('mongodb').MongoClient;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));



function queryDB(db_url, query, callback) {

	MongoClient.connect(db_url, (error, db) => {
		if(error) throw error;

		db.collection('cities')
				.find(query)
				.toArray((error, queryResult) => {
					callback(queryResult);
					db.close();
			});
	});

};


let db_url = 'mongodb://localhost:27017/cityList';
let query = {
	name: 'Sankt-Petersburg'
};

queryDB(db_url, query, queryResult => console.log(queryResult) );


app.get('*', (req, res) => {
	fs.readFile(path.join(__dirname, 'public', 'index.html'), (error, html) => {
		if(error) throw error;

		res.setHeader('Content-Type', 'text/html');
		res.end(html);
	});
});


app.listen(5050, () => console.log(`Server is listening on port 5050`));