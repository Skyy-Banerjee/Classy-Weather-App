import React from "react";
import Weather from "./Weather";
import Input from "./Input";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}



class App extends React.Component {

  state = {
    location: '',
    isLoading: false,
    displayLocation: "",
    weather: {}
  };

  fetchWeather = async () => {
    if (this.state.location < 2) return this.setState({ weather: {} });
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}` });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (evt) => {
    return this.setState({ location: evt.target.value })
  }

  //initial
  componentDidMount() {
    //this.fetchWeather();
    this.setState({ location: localStorage.getItem('location') || "" });
  }

  //re-render
  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
    }
    localStorage.setItem('location', this.state.location);
  }

  render() {

    return (
      <div className="app">
        <h1>Skyy's Classy Weather 👨🏻‍💻🌦️</h1>
        <Input location={this.state.location} onChangeLocation={this.setLocation} />
        {this.state.isLoading && <p>Loading... ⌛</p>}
        {this.state.weather.weathercode && <Weather weather={this.state.weather} location={this.state.displayLocation} />}
      </div>
    )
  }
}

export { getWeatherIcon, formatDay };
export default App;