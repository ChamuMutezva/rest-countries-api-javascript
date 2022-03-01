const mainWrapper = document.querySelector(".mainWrapper");
const filterContinent = Array.from(document.querySelectorAll("option"));
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
	// const backBtn = document.querySelector(".back-btn");
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
	const body = document.querySelector("body");
	const borderBtns = Array.from(document.querySelectorAll(".border"))

	nav.classList.toggle("darkMode")
	header.classList.toggle("darkHeader")

	body.classList.toggle("darkMode");
	modal.classList.toggle("darkMode");
	continents.classList.toggle("darkMode");
	searchCountry.classList.toggle("darkMode");
	countryBtns.forEach(btn => btn.classList.toggle("theme-light"));
	borderBtns.forEach(btn => btn.classList.toggle("theme-light"));
	backBtn.classList.toggle("darkButton");
})

const fetchCountry = async(event) => {
	//old api that was changed - `https://restcountries.eu/rest/v2/all `;
	const apiEndpoint = `https://restcountries.com/v3.1/all`
	const countries = document.querySelector(".countries");

	await fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			data.forEach(element => {

				const { cca3, borders, flags, name, population, region, capital } = element

				//const currency = element.currencies.name;
				let country = document.createElement("div");
				let imageBtn = document.createElement("button");
				let countryDetails = document.createElement("div");
				let img = document.createElement("img");

				//create an array to hold all alpha3Code
				codeArray.push(cca3);
				//create an array to hold all countries
				countryArray.push(name.common);

				country.classList.add("allCountries");
				countryDetails.classList.add("paraName");

				img.classList.add("flags");
				img.alt = `${name.common}'s flag`;
				imageBtn.appendChild(img)
				imageBtn.classList.add("image-btn")

				countries.appendChild(country);
				country.appendChild(imageBtn)
				country.appendChild(countryDetails);

				countryDetails.innerHTML = `
				<div class="country-details-wrapper">				
				  	    <h2 class="country-details-title">
						   ${name.common}
						</h2>
						<div class="country-details-content">
				    		 <p class="country-population">
							     <span class="country-details-data-titles">Population:</span>
								 <span class="country-details-data-content">${population.toLocaleString()}</span>
							</p>
				       		 <p class="country-region">
								<span class="country-details-data-titles">Region:</span>
								<span class="country-details-data-content">${region}</span>
							 </p>
				        	 <p class="country-capital">
							 	<span class="country-details-data-titles">Capital:</span>
							 	<span class="country-details-data-content">${capital}</span>
							 </p>
						</div>
				</div>			  
				`

				img.src = `${flags.svg}`;
				imageBtn.addEventListener("click", function () {					
					modal.classList.remove("hide-modal")
					mainWrapper.classList.add("hide-main-wrapper")					
					borderArray = [];
					if (typeof borders != "undefined") {
						borders.map(country => {
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
	mainWrapper.classList.remove("hide-main-wrapper")	
	modal.classList.add("hide-modal");
})

fetchCountry();

searchCountry.addEventListener("input", (e) => {
	const resultCountry = e.target.value;
	const availableCountries = Array.from(document.querySelectorAll(".country-details-title"));
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
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
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
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

	const borderBool = modal.classList.contains("darkMode")	

	modalWrapper.innerHTML = `					
        
		<div class="country-details">		
			<img class="country-details-img" src= ${flags.svg} alt="the flag of ${name.common} " tabindex=0>
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

					<div class="secondary-message">
						<span class="highLight">Currencies:</span>
						<ul class="currency-list>	
							${currenceList.map(cur => `<li class="currency-list-item">
								<span class="secondary-currency">${cur}</span>
							</li>`)}
						</ul>							
					</div>

					<p class="secondary-message">
					   <span class="highLight">Languages:</span> 
					   <ul class="languages">
						${langs.map(lang => `<li>
						   		<span class="secondary-language">${lang}</span>
						   </li>
						`).join(" ")}
						</ul>
					</p>
		 		 </div>
  
		 		 <div class="bordering-city">
		  			<p class="bordering-content">
					  <span class="highLight">Border countries:</span>
					</p>
		  			<ul class="bordering">					 
					  ${borderState ?
			borderArray.map(border => `<li>
										<button class="border btn ${borderBool ? "theme-light" : ""}"> ${border}</button></li>`).join("")
			: `<li><span>No bordering countries</span></li>`} 						
		   			</ul>
				 </div>		 
				 

			</div> 
	</div>     
	`
	const borderingCountries = document.querySelector(".bordering");
	//add an eventListener to bordering countries
	// when the btn of bordering country is clicked 
	// respective country should be displayed.
	borderingCountries.addEventListener("click", (evt) => {
		const apiEndpoint = `https://restcountries.com/v3.1/name/${evt.target.innerHTML.trim()}`

		fetch(apiEndpoint)
			.then(response => response.json())
			.then(data => {
				//call the modalTemplate and fetched data for a particular
				//country be applied.
				borderArray = [];
				data[0].borders.map(country => {

					codeArray.forEach((elm, index) => {
						if (country == elm) {
							borderArray.push(countryArray[index]);
						}
					})
				});
				modalTemplate(data[0])
			})
	})

}

