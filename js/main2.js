var search = document.getElementById("search");
var matchList = document.getElementById("match-list");
var settings = {
  url: "https://api.covid19api.com/summary",
  method: "GET",
  timeout: 0,
};
$(document).ready(function(){
 $.ajaxSetup({ cache: false });
 $('#search').keyup(function(){
  $('#match-list').html('');
  $('#state').val('');bearch').val();
  var expression = new RegExp(searchField, "i");
  $.getJSON('data.json', function(data)  {
   $.each(data, function(key, value){
    if (value.name.search(expression) != -1 || value.location.search(expression) != -1)
    {
      $('#result').append('<li class="list-group-item link-class"><img src="'+value.image+'" height="40" width="40" class="img-thumbnail" /> '+value.name+' | <span class="text-muted">'+value.location+'</span></li>');
    
    //     const html = matches
    //   .map(
    //     (match) => `<div class ="card card-body mb-1">
    // <h4>${match.Country} <span class="text-primary">(${match.CountryCode}) </span></h4>
    // <div class="row">
    // <small class="text-warning col-2">New confirmed: ${match.NewConfirmed}</small> <small class="text-danger col-2">New death: ${match.NewDeaths}</small> <small class="text-success col-2"> New recovered: ${match.NewRecovered}</small>
    // </div>
    // <div class="row">
    // <small class="text-warning col-2">Total confirmed: ${match.TotalConfirmed}</small> <small class="text-danger col-2">Total death: ${match.TotalDeaths}</small> <small class="text-success col-2"> Total recovered: ${match.TotalRecovered}</small>
    // </div>
    // </div>`
    //   )
    //   .join("");
    // matchList.innerHTML = html;
    }
   });   
  });
 });
 
 $('#match-list').on('click', 'li', function() {
  var click_text = $(this).text().split('|');
  $('#search').val($.trim(click_text[0]));
  $("#match-list").html('');
 });
});