//api key: 7dt5hjlwgudockvh027zf1gijdvye9jl49zria042nxif8xc

const url = 'https://api.snooth.com/wines/?akey=7dt5hjlwgudockvh027zf1gijdvye9jl49zria042nxif8xc'
const name = $('#name');
const type = $('#type');
const color = $('#color');
const sort = $('#sort');


//sets up api url with user input and selections added
function getUrl(){
	$('.submit').click(function(event){
		event.preventDefault();
		url2 = url+`&q=${name.val()}&t=${type.val()}&color=${color.val()}&s=${sort.val()}`;
		loadData(url2, displayData);
		console.log(url2);
	});
}


//listens for user sort selection and sorts results
function sortChanged(){
	const url2 = url+`&q=${name.val()}&t=${type.val()}&color=${color.val()}&s=${sort.val()}`;
	loadData(url2, displayData);
}

//loads the api and runs callback function
function loadData(url, callback){
	$.getJSON(url, callback);
	console.log(url);
}

//error functions when no results are returned
function showErr(err){
	const outputElem = $('#results');
	const errMsg = (
			`<p class=font>No results found.</p>`
		);
	outputElem.html(errMsg);
}

//display api data on DOM
function displayData(data){
	if(data.wines){
	const results = data.wines.map((item, index) => renderResults(item));
	$('#results').html(results);
}else{
	showErr();
}
}


//adds results html to index
function renderResults(result){
	if(result.snoothrank>0){
				return `
		<div class="col-4">
			<div class="resultBorder">
			<a href="${result.link}" target="_blank">
				<img class="wineImg" src="${result.image}" alt="image of ${result.name}">
			</a>
			<a href="${result.link}" target="_blank">
				<p class="wineName">${result.name}</p>
			</a>
			<p>Region: ${result.region}</p>
			<p>Type: ${result.type}</p>
			<p>Price: $ ${result.price}</p>
			<p>Snooth Rating: ${result.snoothrank}/5</p>
			</div>
		</div>
	`
			}else {
				return `
		<div class="col-4">
			<div class="resultBorder">
			<a href="${result.link}" target="_blank">
				<img class="wineImg" src="${result.image}" alt="image of ${result.name}">
			</a>
			<a href="${result.link}" target="_blank">
				<p class="wineName">${result.name}</p>
			</a>
			<p>Region: ${result.region}</p>
			<p>Type: ${result.type}</p>
			<p>Price: $ ${result.price}</p>
			<p>Snooth Rating: N/A</p>
			</div>
		</div>
	`
			}
}

function welcome(){
	$('.over').click(function(event){
		$('main').removeClass('hidden');
		$('header').removeClass('hidden');
		$('.welcome').addClass('hidden');
	});

	$('.under').click(function(event){
		$('.welcome').html(`
			<a href="https://en.wikipedia.org/wiki/Legal_drinking_age">
				<p class="underClick">Sorry, you are too young to view the contents of this site</p>
			</a>
			`);
	});
}

welcome();
getUrl();