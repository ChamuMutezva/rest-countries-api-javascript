const countries = document.querySelector(".countries");
//let countrySelect = Array.from(document.querySelectorAll(".allCountries"));
const mainWrapper = document.querySelector(".mainWrapper");
//const imgCountry = Array.from(document.querySelectorAll(".flags"));
const filterContinent = Array.from(document.querySelectorAll("option"));
//const selectCountry = document.querySelector(".allCountries");
const modal = document.querySelector(".modal");
const backBtn = document.getElementById("backBtn");
const continents = document.querySelector(".continents");
const searchCountry = document.querySelector("input[type='search']");

let modalWrapper = document.createElement("div");
let codeArray = []; //an array to hold all the alpha3Code for all countries
let countryArray = []; // an array to hold the names of the countries
let borderArray = []; // an array to hold countries bordering a country


const toggleImg = document.querySelector(".toggleState"); //Light and dark mode controll
// console.log(toggleImg);
toggleImg.addEventListener("click", () => {
	const btns = Array.from(document.querySelectorAll(".btn"));
	const toggleMsg = document.querySelector(".toggleState span");
	//toggle the Light and dark message
	if (toggleMsg.innerHTML == "Light Mode") {
		toggleMsg.innerHTML = "Dark Mode";
	} else {
		toggleMsg.innerHTML = "Light Mode"
	}
	console.log(toggleMsg)
	const header = document.querySelector("header")
	const nav = document.querySelector("nav");
	nav.classList.toggle("darkMode")
	header.classList.toggle("darkHeader")
	console.log(btns);
	console.log("toggle image clicked");
	const body = document.querySelector("body");
	body.classList.toggle("darkMode");
	modal.classList.toggle("darkMode");
	continents.classList.toggle("darkMode");
	searchCountry.classList.toggle("darkMode");
	btns[0].classList.toggle("darkButton");
	btns.map(btn => {
		if (btns[0].classList.contains("darkButton")) {
			btn.classList.add("darkButton");
		} else {
			btn.classList.remove("darkButton");
		}
	});
})

const fetchCountry = (event) => {

	//const apiEndpoint = `https://restcountries.eu/rest/v2/all `;
	const apiEndpoint = `https://restcountries.com/v3.1/all`

	fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			data.forEach(element => {

				//const currency = element.currencies.name;
				let country = document.createElement("div");
				let countryDetails = document.createElement("div");
				let img = document.createElement("img");

				//create an array to hold all alpha3Code
				codeArray.push(element.cca3);
				//create an array to hold all countries
				countryArray.push(element.name.common);

				country.classList.add("allCountries");
				countryDetails.classList.add("paraName");
				img.classList.add("flags");
				img.alt = `${element.name.common}'s flag`;

				country.appendChild(img);
				countries.appendChild(country);
				country.appendChild(countryDetails);

				countryDetails.innerHTML = `				
				<h2> ${element.name.common}</h2>
				<h5>Population: ${element.population.toLocaleString()}  </h5>
				<h5>Region: <span>${element.region}</span></h5>
				<h5>Capital:  ${element.capital} </h5>			  
				`

				img.src = `${element.flags.svg}`;
				img.addEventListener("click", function (evt) {
					mainWrapper.style.display = "none";
					modal.style.display = "block";
					borderArray = [];

					if (typeof element.borders != "undefined") {
						element.borders.map(country => {
						//	console.log(country)
							codeArray.forEach((elm, index) => {

								if (country == elm) {
									borderArray.push(countryArray[index]);
								//	console.log(countryArray[index]);
								}
							})
						})
					}


					modal.appendChild(modalWrapper);
					modalTemplate(element)
				})

			});

		})
		.catch(error => console.log("Error :", error));
};

backBtn.addEventListener("click", () => {
	mainWrapper.style.display = "block";
	if (modal.children.length > 1) {
		modal.lastElementChild.remove()
	}
	modal.style.display = "none";
})

fetchCountry();


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
})

const continentSelect = document.querySelector("select");
continentSelect.onchange = (evt) => {
	const availableCountries = Array.from(document.querySelectorAll(".paraName span"));
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
		if (myCountry == continentSelect.value || continentSelect.value === "all") {
			country.parentElement.parentElement.parentElement.style.display = "block";
		} else {
			country.parentElement.parentElement.parentElement.style.display = "none";
		}
	})
}

const modalTemplate = (element) => {
	const { currencies, languages, borders, flags, name, population, region, capital, subregion, startOfWeek } = element
	console.log(currencies)
	const currencyObj = Object.keys(currencies)	
	console.log(currencyObj)
	//	const currencyCon =  currencyObj.map(curr => curr)
	//	console.log(currencyCon)
	const currenceList = currencyObj.map(cur => currencies[cur].name)
	console.log(currenceList)
	const langs = Object.values(languages)
	const borderState = typeof borders !== "undefined"

	console.log(borderState)
	console.log(langs)

	modalWrapper.innerHTML = `					
        
		<div class="countryDetails">		
			<img src= ${flags.svg} alt="" tabindex=0>
			<div class="primarySecondary">
				<div class="primary">           
           			 <h3>${name.common}</h3>
            	 	 <h6><span class="highLight">Official name:</span>${name.official}</h6>
            	 	 <h6><span class="highLight">Population:</span> ${population.toLocaleString()}</h6>
           			 <h6><span class="highLight">Region:</span> ${region}</h6>
            	 	 <h6><span class="highLight">Sub region:</span> ${subregion}</h6>
            	 	 <h6><span class="highLight">Capital:</span> ${capital}</h6>
			    </div>
			

          		<div class="secondary">
					<h6>
						<span class="highLight">Start of Week:</span> ${startOfWeek}
					</h6>			
					<h6>
						<span class="highLight">Currencies:</span>	
						${currenceList.map(cur => `<span>${cur}</span>`)}			
									
						
					</h6>			
					<h6><span class="highLight">Languages:</span> 
						${langs.map(lang => `
						   <span>${lang}</span>
						`)}
						
					</h6>
		 		 </div>
  
		 		 <div class="borderingCity">
		  			<h6><span class="highLight">Border countries:</span></h6>
		  			<div class="bordering">					 
					  ${borderState ?
			borders.map(border => `<button class="border btn"> ${border}</button> `).join("")
			: `<span>no borders</span>`} 
						
		   			</div>
				 </div>		 
				 

			</div> 
	</div>     
					`

	// __________________________
	const borderingCountries = document.querySelector(".bordering");


	//console.log(borderingCountries)
	//add an eventListener to bordering countries
	// when the btn of bordering country is clicked 
	// respective country should be displayed.
	borderingCountries.addEventListener("click", (evt) => {
		const apiEndpoint = `https://restcountries.com/v3.1/alpha/${evt.target.innerHTML.trim()}`
		console.log(evt.target.innerHTML)
		console.log(apiEndpoint)
		fetch(apiEndpoint)
			.then(response => response.json())
			.then(data => {
				console.log(data[0])
				//call the modalTemplate and fetched data for a particular
				//country be applied.
				borderArray = [];
				data[0].borders.map(country => {
					console.log(country)
					codeArray.forEach((elm, index) => {

						if (country == elm) {
							borderArray.push(countryArray[index]);
							console.log(countryArray[index]);
						}
					})
				});
				//****************** */
				console.log(data[0].borders)
				modalTemplate(data[0])
			})
	})

	// ________________


}

