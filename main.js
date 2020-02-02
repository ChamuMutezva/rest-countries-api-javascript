const countries = document.querySelector(".countries");
let countrySelect = Array.from(document.querySelectorAll(".allCountries"));
const mainWrapper = document.querySelector(".mainWrapper");
//const imgCountry = Array.from(document.querySelectorAll(".flags"));
const filterContinent = Array.from(document.querySelectorAll("option"));
const selectCountry = document.querySelector(".allCountries");
const modal = document.querySelector(".modal");
const backBtn = document.getElementById("backBtn");
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
				img.alt = `${element.name}'s flag`;

				country.appendChild(img);
				countries.appendChild(country);
				country.appendChild(countryDetails);
				countryDetails.innerHTML = `
				
				<h2> ${element.name}</h2>
				<h5>Population: ${element.population}  </h5>
				<h5>Region: <span>${element.region}</span></h5>
				<h5>Capital:  ${element.capital} </h5>
			  
				`
				/* `Country: <br>
				Capital city: ${element.capital} <br>
				Population: ${element.population} <br>
				${element.region} <br>
				${element.callingCodes} <br>
				${currency.name}
				`;*/

				let modalWrapper = document.createElement("div");
				img.src = `${element.flag}`;

				img.addEventListener("click", function (evt) {
					console.log(element.name);
					console.log(mainWrapper);
					mainWrapper.style.display = "none";
					modal.style.display = "block";
					/*while(modalWrapper.firstChild) {
						console.log(modalWrapper.firstChild);
						modalWrapper.removeChild(modalWrapper.lastChild); 
					}*/

					console.log(modal.children);
					modal.appendChild(modalWrapper);
					modalWrapper.innerHTML = `					
        
		<div class="countryDetails">
		
		<img src= ${element.flag} alt="" tabindex=0>
		<div class="primarySecondary">
			<div class="primary">           
           		 <h3>${element.name}</h3>
            	 <h6>Native name: ${element.nativeName}</h6>
            	 <h6>Population: ${element.population.toLocaleString()}</h6>
           		 <h6>Region: ${element.region}</h6>
            	 <h6>Sub region: ${element.subregion}</h6>
            	 <h6>Capital: ${element.capital}</h6>
			  </div>
			

          <div class="secondary">
			<h6>Top level dormain: ${element.topLevelDomain}</h6>			
			<h6>Currencies:
			<span>
			${element.currencies.map(current => current.code)}
			</span>	
			</h6>			
			<h6>Languages: 
			<span>${element.languages.map(language => language.name)}</span>
			</h6>
		  </div>
  
		  <div class="borderingCity">
		  <h6>Border countries</h6>
		  <div class="bordering">${element.borders.map(border => ` <button> ${border}</button> `).join("")}</div>


	 </div>
		  

		</div> 
		</div>     
					`


				})
			});
		})
		.catch(error => console.log("Error :", error));
};

/*

	<div class="bordering>${element.borders.map(border => {
		if (border == element.alpha3Code) {
			console.log(element.name);
		}
	})} </div>


	
*/

backBtn.addEventListener("click", () => {
	mainWrapper.style.display = "block";
	if (modal.children.length > 1) {
		modal.lastElementChild.remove()
	}
	modal.style.display = "none";
})

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

/*filterContinent.forEach(continent => {
	continent.addEventListener("change", (event) => {
		console.log(continent.value);
		console.log(`${continent.innerHTML} has been clicked`);
	})
})*/

const continentSelect = document.querySelector("select");
console.log(continentSelect);
continentSelect.onchange = (evt) => {
	const availableCountries = Array.from(document.querySelectorAll(".paraName span"));
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();	
		
		if(myCountry == continentSelect.value || continentSelect.value === "all") {
			country.parentElement.parentElement.parentElement.style.display = "block";			
		} else {
			country.parentElement.parentElement.parentElement.style.display = "none";
		}
	})
	console.log(continentSelect.value);
	//console.log(evt)
}
/* continentSelect.addEventListener("click", (evt) => {
	console.log(evt.target);
	console.log(continentSelect.value);
} ) */

/*if (imgCountry) {
	console.log(imgCountry);
	imgCountry.addEventListener("click", (evt) => {
		console.log("image clicked");
	}) 
}*/
console.log(countrySelect);
console.log(filterContinent);