var search = document.getElementById("search");
var matchList = document.getElementById("match-list");
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

//Search ../data/covid-19.json
const searchStates = async (searchText) => {
  const res = await fetch("https://api.covid19api.com/summary", requestOptions);
  //  .then(response => response.json())
  //  .then(result => console.log(result))
  //  .catch(error => console.log('error', error));

  const states = await res.json();
  console.log(states);

  // Match to current text input
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.Country.match(regex);
  });
  console.log(matches);
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};
// // Show results
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `<div class ="card card-body mb-1">
    <h4>${match.Country} <span class="text-primary">(${match.CountryCode}) </span></h4>
    <div class="row">
    <small class="text-warning col-2">New confirmed: ${match.NewConfirmed}</small> <small class="text-danger col-2">New death: ${match.NewDeaths}</small> <small class="text-success col-2"> New recovered: ${match.NewRecovered}</small>
    </div>
    <div class="row">
    <small class="text-warning col-2">Total confirmed: ${match.TotalConfirmed}</small> <small class="text-danger col-2">Total death: ${match.TotalDeaths}</small> <small class="text-success col-2"> Total recovered: ${match.TotalRecovered}</small>
    </div>
    </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};
search.addEventListener("input", () => searchStates(search.value));
