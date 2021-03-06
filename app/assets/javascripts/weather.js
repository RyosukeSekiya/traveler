$(document).on('turbolinks:load', function() {
  var API_KEY = '7ab399170a389d1636f56b881dfa7c40'
  var city = 'Tokyo';
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',jp&units=metric&lang=ja&APPID=' + API_KEY;
  $.ajax({
    url: url,
    dataType: "json",
    type: 'GET',
  })
  .done(function(data) {
    var insertHTML = "";
    var cityName = '<h2>' + data.city.name + '</h2>';
    $('#city-name').html(cityName);
    for (var i = 0; i <= 8; i = i + 2) {
      insertHTML += buildHTML(data, i);
    }
    $('#weather').html(insertHTML);
  })
  .fail(function(data,a,b) {
    console.log(data,a,b);
  });
});

function buildHTML(data, i) {
  var Week = new Array("（日）","（月）","（火）","（水）","（木）","（金）","（土）");
  var date = new Date (data.list[i].dt_txt);
  date.setHours(date.getHours() + 9);
  var month = date.getMonth()+1;
  var day = month + "月" + date.getDate() + "日" + Week[date.getDay()] + date.getHours() + "：00";
  var icon = data.list[i].weather[0].icon;
  var html =
  '<div class="weather-report">' +
    '<img src="http://openweathermap.org/img/w/' + icon + '.png">' +
    '<div class="weather-date">' + day + '</div>' +
    '<div class="weather-main">'+ data.list[i].weather[0].main + '</div>' +
    '<div class="weather-temp">' + Math.round(data.list[i].main.temp) + '℃</div>' +
    '<div class="weather-temp-max">' + '最高：' + Math.round(data.list[i].main.temp_max) + "℃</div>" +
    '<span class="weather-temp-min">' + '最低：' + Math.floor(data.list[i].main.temp_min) + "℃</span>" +
    
  '</div>';
  return html
}