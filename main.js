const countries = document.querySelector(".countries");
let countrySelect = Array.from(document.querySelectorAll(".allCountries"));
const imgCountry = document.querySelector(".flags");


//let country = document.createElement("div");
//let para = document.createElement("p");
//country.classList.add("allCountries");
//para.classList.add("paraName");
//countries.appendChild(country);
//country.appendChild(para);
console.log(countries);
//console.log(country);

const fetchCountry = () => {
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
				let para = document.createElement("p");
				let img = document.createElement("img");

				country.classList.add("allCountries");
				para.classList.add("paraName");
				img.classList.add("flags");

				country.appendChild(img);
				countries.appendChild(country);
				country.appendChild(para);
				para.innerHTML = `Country: ${element.name} <br>
				Capital city: ${element.capital} <br>
				Population: ${element.population} <br>
				${element.region} <br>
				${element.callingCodes} <br>
				${currency.name}
				`;
				img.src = `${element.flag}`;

				img.addEventListener("click", function (evt) {
					console.log(evt.target.parentNode);
				})
				//country.addEventListener("click", fetchOneCountry)

				//console.log(`${element.name}  ${element.flag}  ${element.population} ${element.capital}`)
			});


		})
		.catch(error => console.log("Error :", error));

};
fetchCountry();
const fetchOneCountry = () => {
	const apiEndpoint = `https://restcountries.eu/rest/v2/callingcode/372`;

	fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data);
		}).catch(error => console.log(error))

}


// _____________------------------
//imgCountry.addEventListener("click", function(evt){
//	console.log(evt);
//	})
//---------------------___________________

