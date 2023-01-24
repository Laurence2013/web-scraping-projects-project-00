async function f00(){
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(true), 5000);
	});
}
const var00 = f00();
var00.then(console.log(true));
var00.then(console.log(false));
