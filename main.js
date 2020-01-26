const countries = document.querySelector(".countries");
let countrySelect = Array.from(document.querySelectorAll(".allCountries"));
const imgCountry = document.querySelector(".flags");
const filterContinent = Array.from(document.querySelectorAll("option"));
const modal = document.querySelector(".modal");
//let country = document.createElement("div");
//let para = document.createElement("p");
//country.classList.add("allCountries");
//para.classList.add("paraName");
//countries.appendChild(country);
//country.appendChild(para);
console.log(countries);
//console.log(country);

const fetchCountry = (event) => {

	const apiEndpoint = `https://restcountries.eu/rest/v2/all `;

	fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			data.forEach(element => {
				//let [name,] = element;

				const [currency,] = element.currencies;
				//console.log(currency.name);
				let country = document.createElement("div");
				let countryDetails = document.createElement("div");
				let img = document.createElement("img");

				country.classList.add("allCountries");
				countryDetails.classList.add("paraName");
				img.classList.add("flags");

				country.appendChild(img);
				countries.appendChild(country);
				country.appendChild(countryDetails);
				countryDetails.innerHTML = `
				
				<h2> ${element.name}</h2>
				<h5>Population: ${element.population}  </h5>
				<h5>Region: ${element.region}</h5>
				<h5>Capital:  ${element.capital} </h5>
			  
				`
				/* `Country: <br>
				Capital city: ${element.capital} <br>
				Population: ${element.population} <br>
				${element.region} <br>
				${element.callingCodes} <br>
				${currency.name}
				`;*/
				img.src = `${element.flag}`;

				img.addEventListener("click", function (evt) {
					console.log(evt.currentTarget);
				})
				//country.addEventListener("click", fetchOneCountry)

				//console.log(`${element.name}  ${element.flag}  ${element.population} ${element.capital}`)
			});


		})
		.catch(error => console.log("Error :", error));

};
fetchCountry();


/* const fetchOneCountry = () => {
	const apiEndpoint = `https://restcountries.eu/rest/v2/callingcode/372`;

	fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data);
		}).catch(error => console.log(error))

} */


// _____________------------------
//imgCountry.addEventListener("click", function(evt){
//	console.log(evt);
//	})
//---------------------___________________
const searchCountry = document.querySelector("input[type='search']");
searchCountry.addEventListener("input", (e) => {
	const resultCountry = e.target.value;
	const availableCountries = Array.from(document.querySelectorAll(".paraName h2"));
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
		if (myCountry.includes(resultCountry.toLowerCase().trim())) {
			country.parentElement.parentElement.style.display = "block";
		} else {
			country.parentElement.parentElement.style.display = "none";
		}
	})

	console.log(e.target.value);

})
console.log(searchCountry);

filterContinent.forEach(continent => {
	continent.addEventListener("change", (event) => {
		console.log(event);
		console.log(`${continent.innerHTML} has been clicked`);
	})
})

if (imgCountry) {
	imgCountry.addEventListener("click", (evt) => {
		console.log(evt);
	})
}
console.log(filterContinent);