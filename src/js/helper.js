// Fetch resource from url
export const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// Format and get weather data
export const getWeatherData = function (weather) {
  const weatherData = {
    id: weather.id,
    country: weather.sys.country,
    name: weather.name,
    coord: {
      lat: weather.coord.lat,
      lon: weather.coord.lon,
    },
    humidity: weather.main.humidity,
    pressure: weather.main.pressure,
    temp: weather.main.temp,
    sunrise: formatTime(weather.sys.sunrise),
    sunset: formatTime(weather.sys.sunset),
  };

  weather.weather.forEach(function (weath, i) {
    weatherData.description = weath.description;
    weatherData.icon = weath.icon;
  });

  return weatherData;
};

export const getLocationForcast = function (daysWeather) {
  const weatherDatas = daysWeather.map(function (weath, i) {
    const weather = {
      humidity: weath.humidity,
      pressure: weath.pressure,
      temp: weath.temp.day,
      daytime: getForcastDay(weath.dt),
      sunrise: formatTime(weath.sunrise),
      sunset: formatTime(weath.sunset),
    };

    weath.weather.forEach(function (w, i) {
      weather.description = w.description;
      weather.icon = w.icon;
    });

    return weather;
  });
  return weatherDatas;
};

// Format the timestamp to locale time
export const formatTime = function (t) {
  const time = new Date(t * 1000);
  const locale = navigator.language;
  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
    timeZone: 'UTC',
  });
  return timeFormat.format(time);
};

// Get forcast week day
const getForcastDay = function (timeStamp) {
  const time = new Date(timeStamp * 1000).getTime();
  const locale = navigator.language;
  const timeFormat = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return timeFormat.format(time);
};
