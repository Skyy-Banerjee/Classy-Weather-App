import React from 'react';
import Day from './Day';

class Weather extends React.Component {
    componentWillUnmount(){
        console.log(`Weather is unmounting..`);
    }
    render() {
        const {
            temperature_2m_max: max,
            temperature_2m_min: min,
            time: dates, weathercode: codes
        } = this.props.weather;
        return (
            <div>

                <h2>Weather for {this.props.location}</h2>
                <ul className="weather">
                    {
                        dates.map((date, idx) => <Day date={date} max={max.at(idx)} min={min.at(idx)} code={codes.at(idx)} key={date} isToday={idx === 0} />)
                    }
                </ul>
            </div>
        )
    }
}

export default Weather;