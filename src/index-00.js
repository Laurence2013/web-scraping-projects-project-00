const request = require('request-promise');
const cheerio = require('cheerio');
const fs 			= require('fs');

async function main(){
	let testArr = [];
	const html = await request('https://reactnativetutorial.net/css-selectors/lesson2.html');
	
	fs.writeFileSync('./scrapes/test.html', html);

	const $ = await cheerio.load(html);
	const getText00 = $('h1').text();
	const getText01 = $('h2').map((index, element) => {
		return $(element).text();
	}).get();
	const getText02 = $('h2').map((index, element) => {
		return $(element).text();
	}).toArray();
	const getText03 = $('h2').map((index, element) => {
		return $(element).text();
	}).toArray().join();

	//$('h2').each((index, element) => testArr.push($(element).text()));
	//console.log(testArr);
}

main();
