const country = document.querySelector(".country");
const btn = document.getElementById("backwards");
console.log(country);
console.log(btn);
btn.addEventListener("click", function () {
    window.location = "index.html";
})

const fetchOneCountry = () => {
    const apiEndpoint = `https://restcountries.eu/rest/v2/callingcode/372`;

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(error => console.log(error) )

}

fetchOneCountry();