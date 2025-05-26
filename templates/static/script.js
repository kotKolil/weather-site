api_key = 'bbf4b6a7a7274475a69120119252605'

$(document).ready(() => {
    var search_field = $(".search_field")
    var submit_button = $(".submit_button")
    var forecast_box = $(".forecast_box")

    submit_button.click( () => {
            var field_value = search_field.val()

            $.ajax(
                {
                    url:`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${field_value}`,
                    type: "GET",
                    success: (data) => {
                        var jsonString = JSON.parse(JSON.stringify(data));

                        forecast_box.append($(`<h1>${field_value}, ${jsonString.forecast.forecastday[0].date} </h1>`))
                        forecast_box.append($(`<p> average temp is ${jsonString.forecast.forecastday[0].day.avgtemp_c} C </p>`))
                        forecast_box.append($(`<p> condition: ${jsonString.forecast.forecastday[0].day.condition.text} </p>`))
                        forecast_box.append($(`<p> wind speed is ${jsonString.forecast.forecastday[0].day.maxwind_mph} </p>`))




                    },
                    error: () => {
                        $("#error-msg").text("Error: town not found")
                    }
                }
            )
        }
    )
})