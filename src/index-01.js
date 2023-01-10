const request = require('request-promise');
const cheerio = require('cheerio');

async function main(){
	let countries = [];
	const result = await request.get('https://www.scrapethissite.com/pages/simple/');
	const $ = cheerio.load(result);

	const title_00 = $("body > div#page > section#countries > div.container > div.row:nth-child(1) > div.col-md-12 > h1").text().trim();
	const title_01 = $("body > div#page > section#countries > div.container > div.row:nth-child(1) > div.col-md-12 > h1").text().replace(/\s+/g, " ").trim();
	const title_02 = $("body > div#page > section#countries > div.container > div.row:nth-child(1) > div.col-md-12 > h1").text().trim().split('\n')[0];

	const desc_00 = $("div.container").find("p.lead").text().trim();
	const desc_01 = $("div.container").find("p.lead").text().trim().split('\n')[0];
	const desc_02 = $("div.container").find("p.lead").text().trim().split('\n')[1].trim();
	const desc_03 = $("div.container").find("p.lead").text().trim().split('\n').join(' ').replace(/\s{2,}/g, ' ');

	const country_name_00 = $("div.row > div.col-md-4 > h3.country-name").text().trim().replace(/\s{2,}/g, ' ');
	const country_name_01 = $("div.row > div.col-md-4 > h3.country-name").map((index, element) => {
		return $(element).text().trim();
	}).get();
	const country_name_02 = $("div.row > div.col-md-4 > h3.country-name").map((index, element) => {
		return $(element).text().trim();
	}).toArray();

	/*
	$("div.row > div.col-md-4 > h3.country-name").each((index, element) => {
		countries.push($(element).text().trim());
	});
	console.log(countries[0]);
	console.log(countries[1]);
	*/

	console.log(country_name_02[0]);
}
main();
