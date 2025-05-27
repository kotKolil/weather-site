api_key = 'bbf4b6a7a7274475a69120119252605'



$(document).ready(() => {
    var search_field = $(".search_field")
    var submit_button = $(".submit_button")
    var recent = $(".recent")

    window.auto_format = function(name) {
        search_field.val(name);
    };

    const keys = Object.keys(localStorage).sort().reverse();
    for (const key of keys) {
        recent.append($(`<button onclick="auto_format('${localStorage.getItem(key)}')">${localStorage.getItem(key)}</button>`));
    }

    submit_button.click( () => {
            var field_value = search_field.val()

            $.ajax(
                {
                    url:`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${field_value}`,
                    type: "GET",
                    success: (data) => {
                        $("#error-msg").empty()
                        var jsonString = JSON.parse(JSON.stringify(data));

                        localStorage.setItem(Date.now(), field_value)
                        console.log(localStorage)

                        var forecast_box = $(".forecast_box")

                        if (forecast_box.length) {
                            forecast_box.empty()
                            forecast_box.append($(`<h1>${field_value}, ${jsonString.forecast.forecastday[0].date} </h1>`))
                            forecast_box.append($(`<p> average temp is ${jsonString.forecast.forecastday[0].day.avgtemp_c} C </p>`))
                            forecast_box.append($(`<p> condition: ${jsonString.forecast.forecastday[0].day.condition.text} </p>`))
                            forecast_box.append($(`<p> wind speed is ${jsonString.forecast.forecastday[0].day.maxwind_mph} </p>`))
                        }
                        else {
                            $(".search_box").append($("<div class = 'forecast_box'></div>"))
                            var forecast_box = $(".forecast_box")
                            forecast_box.append($(`<h1>${field_value}, ${jsonString.forecast.forecastday[0].date} </h1>`))
                            forecast_box.append($(`<p> average temp is ${jsonString.forecast.forecastday[0].day.avgtemp_c} C </p>`))
                            forecast_box.append($(`<p> condition: ${jsonString.forecast.forecastday[0].day.condition.text} </p>`))
                            forecast_box.append($(`<p> wind speed is ${jsonString.forecast.forecastday[0].day.maxwind_mph} </p>`))
                        }









                    },
                    error: () => {
                        $("#error-msg").text("Error: town not found")
                    }
                }
            )
        }
    )
})