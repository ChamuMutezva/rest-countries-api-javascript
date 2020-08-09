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
let borderArray = []; // an array to hold countries bordering a country
//let country = document.createElement("div");
//let para = document.createElement("p");
//country.classList.add("allCountries");
//para.classList.add("paraName");
//countries.appendChild(country);
//country.appendChild(para);
//console.log(countries);
//console.log(country);

const toggleImg = document.querySelector(".toggleState"); //Light and dark mode controll
console.log(toggleImg);
toggleImg.addEventListener("click", () => {
	console.log("toggle image clicked");
	const body = document.querySelector("body");
	body.classList.toggle("lightMode");
	modal.classList.toggle("lightMode");
	continents.classList.toggle("lightMode");
	searchCountry.classList.toggle("lightMode");
})

const fetchCountry = (event) => {
	let codeArray = []; //an array to hold all the alpha3Code for all countries
	let countryArray = []; // an array to hold the names of the countries
	

	const apiEndpoint = `https://restcountries.eu/rest/v2/all `;

	fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			//console.log(data);
			data.forEach(element => {

				const [currency,] = element.currencies;
				let country = document.createElement("div");
				let countryDetails = document.createElement("div");
				let img = document.createElement("img");

				//create an array to hold all alpha3Code
				codeArray.push(element.alpha3Code);
				//create an array to hold all countries
				countryArray.push(element.name);

				country.classList.add("allCountries");
				countryDetails.classList.add("paraName");
				img.classList.add("flags");
				img.alt = `${element.name}'s flag`;

				country.appendChild(img);
				countries.appendChild(country);
				country.appendChild(countryDetails);
				countryDetails.innerHTML = `
				
				<h2> ${element.name}</h2>
				<h5>Population: ${element.population.toLocaleString()}  </h5>
				<h5>Region: <span>${element.region}</span></h5>
				<h5>Capital:  ${element.capital} </h5>
			  
				`

				//let modalWrapper = document.createElement("div");
				img.src = `${element.flag}`;

				img.addEventListener("click", function (evt) {
					//console.log(element.name);
					//console.log(mainWrapper);
					mainWrapper.style.display = "none";
					modal.style.display = "block";
					/*while(modalWrapper.firstChild) {
						console.log(modalWrapper.firstChild);
						modalWrapper.removeChild(modalWrapper.lastChild); 
					}*/
					//console.log(codeArray);
					borderArray = [];
					element.borders.map(country => {
						console.log(country)
						codeArray.forEach((elm, index) => {

							if (country == elm) {
								borderArray.push(countryArray[index]);
								console.log(countryArray[index]);
							}
						})
					});
					//console.log(borderArray);
					//console.log(modal.children);
					modal.appendChild(modalWrapper);
					modalTemplate(element)
					

				})
				//modal.removeChild(modalWrapper)
				//modal.appendChild(modalWrapper);
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

	console.log(e.target.value);
})
//console.log(searchCountry);

const continentSelect = document.querySelector("select");
//console.log(continentSelect);
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
	//console.log(continentSelect.value);
	//console.log(evt)
}

//console.log(countrySelect);
//console.log(filterContinent);
// const modalTemplate = (element) =>  {}

const modalTemplate = (element) => {

	modalWrapper.innerHTML = `					
        
		<div class="countryDetails">		
			<img src= ${element.flag} alt="" tabindex=0>
			<div class="primarySecondary">
				<div class="primary">           
           			 <h3>${element.name}</h3>
            	 	 <h6><span class="highLight">Native name:</span> ${element.nativeName}</h6>
            	 	 <h6><span class="highLight">Population:</span> ${element.population.toLocaleString()}</h6>
           			 <h6><span class="highLight">Region:</span> ${element.region}</h6>
            	 	 <h6><span class="highLight">Sub region:</span> ${element.subregion}</h6>
            	 	 <h6><span class="highLight">Capital:</span> ${element.capital}</h6>
			    </div>
			

          		<div class="secondary">
					<h6>
						<span class="highLigh"t>Top level dormain:</span> ${element.topLevelDomain}
					</h6>			
					<h6>
						<span class="highLight">Currencies:</span>
						<span>
							${element.currencies.map(current => current.code)}
						</span>	
					</h6>			
					<h6><span class="highLight">Languages:</span> 
						<span>${element.languages.map(language => language.name)}</span>
					</h6>
		 		 </div>
  
		 		 <div class="borderingCity">
		  			<h6><span class="highLight">Border countries:</span></h6>
		  			<div class="bordering">${borderArray.map(border => `
		  	 			<button class="border"> ${border}</button> `).join("")}
		   			</div>
				 </div>		  

			</div> 
	</div>     
					`

					// __________________________
					const borderingCountries = document.querySelector(".bordering");


					console.log(borderingCountries)
					borderingCountries.addEventListener("click", (evt) => {
						console.log(evt.target)
					})

					// ________________


}