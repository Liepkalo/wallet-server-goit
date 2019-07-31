const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const costs = require('./db/costs/all-costs.json');

app.get('/', function (req, res) {
	res.send('Hello World +++');
});

app.get('/costs', function (req, res) {
	res.send(costs);
});

app.get('/costs/:id', (req, res) => {
	let oneCosts = costs.find((costs) => {
		return costs.id === Number(req.params.id)
	})
	res.send(oneCosts)
})

app.get('/costs/:categories', (req, res) => {
	let category = costs.find((costs) => {
		return costs.categories === String(req.params.categories)
	})
	res.send(category)
})

app.get('/costs/:categories', (req, res) => {
	let category = costs.find((costs) => {
		return costs.categories === String(req.params.categories)
	})
	res.send(req.query.category)
})

app.use(function (req, res, next) {
	let err = new Error('not found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

app.listen(PORT, () => {
	console.log('server is running on ' + PORT);
});