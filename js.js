"use strict";

let days = [
     "Sunday",
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
     "Friday",
     "Saturday",
];

async function test(region) {
     let fetchdata = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=77ad213efd5c4a61bed115255210610&q=${region}&days=3`
     );
     let response = await fetchdata.json();

     return {
          day1: {
               day: new Date().toLocaleString("en-us", { weekday: "long" }),
               month:
                    new Date().getDate() +
                    " " +
                    new Date().toLocaleString("en-us", { month: "long" }),
               region: response.location.name,
               temp: response.current.temp_c + "°C",
               text: response.current.condition.text,
               wind: response.current.wind_kph,
               windD: response.current.wind_dir,
               rain: response.forecast.forecastday[0].day.daily_chance_of_rain,
               icon: response.current.condition.icon,
          },
          day2: {
               temp: response.forecast.forecastday[1].day.maxtemp_c + "°C",
               icon: response.forecast.forecastday[1].day.condition.icon,
               minTemp: response.forecast.forecastday[1].day.mintemp_c + "°C",
               text: response.forecast.forecastday[1].day.condition.text,
          },
          day3: {
               temp: response.forecast.forecastday[2].day.maxtemp_c + "°C",
               icon: response.forecast.forecastday[2].day.condition.icon,
               minTemp: response.forecast.forecastday[2].day.mintemp_c + "°C",
               text: response.forecast.forecastday[2].day.condition.text,
          },
     };
}

function displayData(APIresponse) {
     for (let i = 0; i < 3; i++) {
          $(`.temp:eq(${i})`).html(APIresponse[`day${i + 1}`].temp);
          $(`.icon:eq(${i})`).attr(
               "src",
               "https:" + APIresponse[`day${i + 1}`].icon
          );
          $(`.text:eq(${i})`).html(APIresponse[`day${i + 1}`].text);
     }
     $(".day1 header .day").html(APIresponse[`day${1}`].day);
     $(".day1 header .date").html(APIresponse[`day${1}`].month);
     $(".day1 .region").html(APIresponse[`day1`].region);
     $(".day1 .dayonestats .rain").html(APIresponse[`day1`].rain);
     $(".day1 .dayonestats .wind").html(APIresponse[`day1`].wind);
     $(".day1 .dayonestats .windD").html(APIresponse[`day1`].windD);
     let dayindex = new Date().getDay() != 6 ? new Date().getDay() : 0;
     $(".forecast-container header:eq(1)").html(
          days[new Date().getDay() + 1 != 6 ? new Date().getDay() + 1 : 0]
     );
     $(".forecast-container header:eq(2)").html(
          days[new Date().getDay() + 2 != 6 ? new Date().getDay() + 1 : 0]
     );
     $(".forecast-container .mintemp:eq(0)").html(APIresponse["day2"].minTemp);
     $(".forecast-container .mintemp:eq(1)").html(APIresponse["day3"].minTemp);
}

async function run(search) {
     search = search === undefined || search === "" ? "egypt" : search;
     let tobelogged = await test(search);
     displayData(tobelogged);
}
$("#search").keydown(function () {
     let search = $("#search").val();
     run(search);
});
run();
