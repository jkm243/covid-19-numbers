var search = document.getElementById("search");
var matchList = document.getElementById("match-list");
var time = document.getElementById("time-date");
var requestOptions = {
  method: "GET",
  redirect: "follow",
};
var timeDate
var today = moment(timeDate)

const searchStates = async (searchText) => {
  const res = await fetch("https://api.covid19api.com/summary", requestOptions)
    .then((response) => response.json())
    .then((data) => {
        timeDate=data.Date
      // Match to current text input
      let matches = data.Countries.filter((state) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return state.Country.match(regex);
      });
      console.log(today.format('LLLL'));
      if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
      }

      outputHtml(matches);
    })
    .catch((error) => console.log("error", error));
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
      time.innerHTML="Update: "+today.format('LLLL')
    }
  };
search.addEventListener("input", () => searchStates(search.value));
