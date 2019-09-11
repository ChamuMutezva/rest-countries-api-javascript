const country = document.querySelector(".country");
console.log(country);

const fetchOneCountry = () => {
    const apiEndpoint = `https://restcountries.eu/rest/v2/callingcode/372`;

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(error => console.log(error) )

}

fetchOneCountry();