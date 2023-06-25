/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function genText (text) {
	let markMach = new markov.MarkovMachine(text);
	console.log(markMach.makeText());
}

function makeText () {
	fs.read(path, 'utf8', function cb (err, data) {
		if (err) {
			console.error(' Cannot read file: ${path}: ${err}');
			process.exit(1);
		}
		else {
			genText(data);
		}
	});
}

async function makeURLText (url) {
	let res;

	try {
		res = await axios.get(url);
	} catch (err) {
		console.error('Cannot read URL" ${urk}: ${err}');
	}
	genText(res.data);
}

let [ method, path ] = process.argv.slice(2);

if (method === 'file') {
	makeText(path);
}
else if (method === 'url') {
	makeURLText(path);
}
else {
	console.error('Unknown method: ${method');
	process.exit(1);
}
