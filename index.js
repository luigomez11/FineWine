//api key: 7dt5hjlwgudockvh027zf1gijdvye9jl49zria042nxif8xc

const url = 'http://api.snooth.com/wines/?akey=7dt5hjlwgudockvh027zf1gijdvye9jl49zria042nxif8xc'
const name = $('#name');
const type = $('#type');
const color = $('#color');
const sort = $('#sort');

function getUrl(){
	$('button').click(function(event){
		event.preventDefault();
		url2 = url+`&q=${name.val()}&t=${type.val()}&color=${color.val()}&s=${sort.val()}`;
		loadData(url2, displayData);
		console.log(url2);
	});
}

function sortChanged(){
	const url2 = url+`&q=${name.val()}&t=${type.val()}&color=${color.val()}&s=${sort.val()}`;
	loadData(url2, displayData);
}

function loadData(url, callback){
	$.getJSON(url, callback);
	console.log(url);
}

function showErr(err){
	const outputElem = $('#results');
	const errMsg = (
			`<p>We couldn't find any results</p>`
		);
	outputElem.html(errMsg);
}

function displayData(data){
	if(data.wines){
	const results = data.wines.map((item, index) => renderResults(item));
	$('#results').html(results);
}else{
	showErr();
}
}

function renderResults(result){
	return `
		<div>
			<a href="${result.link}" target="_blank">
				<h4>${result.name}</h4>
			</a>
			<a href="${result.link}" target="_blank">
				<img src="${result.image}" alt="image of ${result.name}">
			</a>
			<p>Region: ${result.region}</p>
			<p>Type: ${result.type}</p>
			<p>Price: $ ${result.price}</p>
			<p>Snooth Rating: ${result.snoothrank}/5</p>
		</div>
	`
}

getUrl();