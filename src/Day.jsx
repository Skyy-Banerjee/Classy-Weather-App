import React, { Component } from 'react'
import { getWeatherIcon, formatDay } from './App';

export default class Day extends Component {
    render() {
        const { date, max, min, code, isToday } = this.props;
        return (
            <li className='day'>
                <span>{getWeatherIcon(code)}</span>
                <p>{isToday ? "Today" : formatDay(date)}</p>
                <p>{Math.floor(min)}&deg;C &mdash; <strong>{Math.ceil(max)}&deg;C</strong></p>
            </li>
        )
    }
}
