import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 5 };
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleIncrement() {
        this.setState((currState) => {
            return { count: currState.count + 1 };
        });
    }

    handleDecrement() {
        this.setState((currState) => {
            return { count: currState.count - 1 };
        });
    }

    render() {
        const date = new Date('jun 21 2027');
        date.setDate(date.getDate() + this.state.count);
        return (
            <div>
                <button onClick={this.handleIncrement}>+</button>
                <span>
                    {date.toDateString()} [{this.state.count}]
                </span>
                <button onClick={this.handleDecrement}>-</button>
            </div>
        );
    }
}

export default Counter;