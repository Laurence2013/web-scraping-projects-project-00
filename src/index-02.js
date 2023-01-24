const request = require('request-promise');
const cheerio = require('cheerio');
const objToCsv = require('objects-to-csv');
const objToFs = require('fs');

const url_00 = 'https://geopolitics.co/';

async function getSiteAndMenuTitles(){
	const getHtml = await request.get(url_00);
	const $ = cheerio.load(getHtml);
	const data = []
	
	$('.nav-menu > li:nth-child(1) > ul > li').map((index, elem) => {
		const subMenuTitles = $(elem).find('a').text();
		const subMenuLinks = $(elem).find('a').attr('href');

		data.push({ id: index, subMenuTitles: subMenuTitles, subMenuLinks: subMenuLinks });
	});
	return data;
}
async function createCsvFile(html){
	try{
		let csv = new objToCsv(html);
		await csv.toDisk("./scrapes/geopolitics-dot-co/test.html");
	}catch(err){
		console.log(err);
	}
}
async function createFsFile(html){
	const jsonData = JSON.stringify(html);

	await objToFs.writeFile('./scrapes/geopolitics-dot-co/menus-titles-sub-menus.json', jsonData, function(err){
		if(err) console.log(err);
	});
}
async function scrapeWebsite00(){
	const menu = getSiteAndMenuTitles();

	await createFsFile(menu);
}
function scrapeWebsite01(){
	getSiteAndMenuTitles().then(data00 => createFsFile(data00));
}
scrapeWebsite01();
