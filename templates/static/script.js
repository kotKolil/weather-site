$(document).ready(() => {
  const api_key = 'bbf4b6a7a7274475a69120119252605';
  const search_field = $(".search_field");
  const submit_button = $(".submit_button");
  const recent = $(".recent");

  window.auto_format = (name) => search_field.val(name);

  const recentSearches = Object.keys(localStorage)
    .sort((a, b) => b - a)

  recentSearches.forEach(key => {
    recent.append($(`<button onclick="auto_format('${escapeHtml(localStorage.getItem(key))}')">
      ${escapeHtml(localStorage.getItem(key))}
    </button>`));
  });

  function updateForecastBox(container, location, data) {
    const forecastHTML = `
      <h1>${escapeHtml(location)}, ${data.forecast.forecastday[0].date}</h1>
      <p>Average temp is ${data.forecast.forecastday[0].day.avgtemp_c} C</p>
      <p>Condition: ${escapeHtml(data.forecast.forecastday[0].day.condition.text)}</p>
      <p>Wind speed is ${data.forecast.forecastday[0].day.maxwind_mph} mph</p>
    `;
    container.html(forecastHTML);
  }

  submit_button.click(() => {
    const field_value = search_field.val().trim();
    if (!field_value) {
      $("#error-msg").text("Please enter a location.");
      return;
    }

    $.ajax({
      url: `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${encodeURIComponent(field_value)}`,
      type: "GET",
      success: (data) => {
        $("#error-msg").empty();
        localStorage.setItem(Date.now(), field_value);

        let forecast_box = $(".forecast_box");
        if (!forecast_box.length) {
          forecast_box = $("<div class='forecast_box'></div>");
          $(".search_box").append(forecast_box);
        }

        updateForecastBox(forecast_box, field_value, data);
      },
      error: (xhr) => {
        $("#error-msg").text(xhr.status === 400 
          ? "Error: Location not found." 
          : "Error: Unable to fetch weather data.");
      }
    });
  });
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}