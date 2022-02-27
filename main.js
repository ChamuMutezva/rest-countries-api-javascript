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


const toggleImg = document.querySelector(".toggle-state-btn"); //Light and dark mode controll
toggleImg.addEventListener("click", () => {
	const btns = Array.from(document.querySelectorAll(".btn"));
	const toggleMsg = document.querySelector(".toggle-state-btn span");
	const countryBtns = Array.from(document.querySelectorAll(".allCountries"));
	//toggle the Light and dark message
	if (toggleMsg.innerHTML == "Light Mode") {
		toggleMsg.innerHTML = "Dark Mode";
		toggleMsg.classList.remove("theme-light")
	} else {
		toggleMsg.innerHTML = "Light Mode"
		toggleMsg.classList.add("theme-light")
	}
	
	const header = document.querySelector("header")
	const nav = document.querySelector("nav");
	nav.classList.toggle("darkMode")
	header.classList.toggle("darkHeader")	
	const body = document.querySelector("body");
	body.classList.toggle("darkMode");
	modal.classList.toggle("darkMode");
	continents.classList.toggle("darkMode");
	searchCountry.classList.toggle("darkMode");
	btns[0].classList.toggle("darkButton");

	countryBtns.forEach(btn => btn.classList.toggle("theme-light"))

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
				let imageBtn = document.createElement("button");
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

				//country.appendChild(img);
				imageBtn.appendChild(img)
				imageBtn.classList.add("image-btn")
				countries.appendChild(country);
				country.appendChild(imageBtn)
				country.appendChild(countryDetails);

				countryDetails.innerHTML = `
				<div class="country-details-wrapper">				
				  	    <h2 class="country-details-title">
						   ${element.name.common}
						</h2>
						<div class="country-details-content">
				    		 <p class="country-population">
							     <span class="country-details-data-titles">Population:</span>
								 <span class="country-details-data-content">${element.population.toLocaleString()}</span>
							</p>
				       		 <p class="country-region">
								<span class="country-details-data-titles">Region:</span>
								<span class="country-details-data-content">${element.region}</span>
							 </p>
				        	 <p class="country-capital">
							 	<span class="country-details-data-titles">Capital:</span>
							 	<span class="country-details-data-content">${element.capital}</span>
							 </p>
						</div>
				</div>			  
				`

				img.src = `${element.flags.svg}`;
				imageBtn.addEventListener("click", function (evt) {
					mainWrapper.style.display = "none";
					modal.style.display = "block";
					borderArray = [];

					if (typeof element.borders != "undefined") {
						element.borders.map(country => {							
							codeArray.forEach((elm, index) => {

								if (country == elm) {
									borderArray.push(countryArray[index]);									
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
	console.log(resultCountry)
	const availableCountries = Array.from(document.querySelectorAll(".country-details-title"));
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
		//	console.log(myCountry)
		if (myCountry === resultCountry.toLowerCase().trim()) {
			country.closest(".allCountries").classList.remove("hide-card")
		} else if (myCountry.includes(resultCountry.toLowerCase().trim())) {						
			country.closest(".allCountries").classList.remove("hide-card")			
		} else {			
			country.closest(".allCountries").classList.add("hide-card")			
		}
	})
})

const continentSelect = document.querySelector("select");
continentSelect.onchange = (evt) => {
	const availableCountries = Array.from(document.querySelectorAll(".country-region span"));
	console.log(continentSelect)
	console.log(availableCountries)
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
		console.log(myCountry)
		if (myCountry == continentSelect.value || continentSelect.value === "all") {
			country.closest(".allCountries").classList.remove("hide-card")
		} else {
			country.closest(".allCountries").classList.add("hide-card")
		}
	})
}

const modalTemplate = (element) => {
	const { currencies, languages, borders, flags, name, population, region, capital, subregion, startOfWeek } = element
	
	const currencyObj = Object.keys(currencies)	
	const currenceList = currencyObj.map(cur => currencies[cur].name)	
	const langs = Object.values(languages)
	const borderState = typeof borders !== "undefined"
	modalWrapper.classList.add("modal-container")
	
	modalWrapper.innerHTML = `					
        
		<div class="country-details">		
			<img class="country-details-img" src= ${flags.svg} alt="" tabindex=0>
			<div class="primary-secondary">
				<div class="primary">           
           			 <h3 class="primary-title">${name.common}</h3>
					 <div class="primary-divider">
            	 	 	 <p class="primary-message">
						   <span class="highLight">Official name:</span>${name.official}
						</p>
            	 		<p class="primary-message">
						  <span class="highLight">Population:</span> ${population.toLocaleString()}
						</p>
           				 <p class="primary-message">
							<span class="highLight">Region:</span> ${region}
						</p>
            	 	 	 <p class="primary-message">
						   <span class="highLight">Sub region:</span> ${subregion}
						</p>
            	 	 	 <p class="primary-message">
						   <span class="highLight">Capital:</span> ${capital}
						 </p>
					  </div>
			    </div>
			

          		<div class="secondary">
					<p class="secondary-message">
						<span class="highLight">Start of Week:</span> ${startOfWeek}
					</p>

					<p class="secondary-message">
						<span class="highLight">Currencies:</span>	
						${currenceList.map(cur => `<span class="secondary-currency">${cur}</span>`)}							
					</p>

					<p class="secondary-message">
					   <span class="highLight">Languages:</span> 
					   <div class="languages">
						${langs.map(lang => `
						   <span class="secondary-language">${lang}</span>
						`)}
						</div
					</p>
		 		 </div>
  
		 		 <div class="bordering-city">
		  			<p class="bordering-content">
					  <span class="highLight">Border countries:</span>
					</p>
		  			<div class="bordering">					 
					  ${borderState ?
			borderArray.map(border => `<button class="border btn"> ${border}</button> `).join("")
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
		const apiEndpoint = `https://restcountries.com/v3.1/name/${evt.target.innerHTML.trim()}`
		console.log(evt.target.innerHTML)
		console.log(apiEndpoint)
		fetch(apiEndpoint)
			.then(response => response.json())
			.then(data => {
				console.log(data)
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

