import React, { Component } from 'react';
import LottoBall from './LottoBall';
import './LottoGameBoard.css';

const FALSE_NUM_SIZE = 5;

class LottoGameBoard extends Component {

    static defaultProps = {
        gameTitle: 'Untitled Game',
        numBalls: 4,
        minimum: 0,
        maximum: 9,
        bonusBall: false,
        noRepeat: false,
        sort: false,
        twoDigits: false
    };

    // [values] defaults to an array of arrays matching the length of props.numBalls 
    //          with one element inside each array: '?'
    state = {
        values: Array.from({ length: this.props.numBalls }, (v, i) => ['?']),
        bonusValues: ['?'],
        generatingResults: false
    };

    createNumber = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    };

    generate = () => {
        const { 
            minimum,
            maximum,
            noRepeat,
            sort,
        } = this.props;

        // [accumulator] will hold the 'selected' random numbers we show in the UI
        // [prevValues] will hold the previously shown random number and hold it for next 'generate' animation
        let accumulator = [];
        let prevValues = [];
        let bonusValues = ['?'];

        // [getNumber] recursive random number generator - checks for repeats and returns the value
        const getNumber = (min, max) => {
            const num = this.createNumber(min, max);
            if (noRepeat && accumulator.includes(num)) {
                return getNumber(min, max);
            }
            return num;
        };

        // generate the sequence of randomly generated numbers
        // stored as an array of single element arrays matching the length of values.length
        const numbers = this.state.values.map((v, i) => {
            // [prevValues] stores the last shown randomly generated lottery number - which is at the end of the array
            prevValues.push(v[v.length-1]);
            const myNum = getNumber(minimum, maximum);
            accumulator.push(myNum);
            return [ myNum ];
        });

        if (sort) numbers.sort((a, b) => a[0] - b[0]);

        // generate the 'fake' numbers to scroll/animate prior to showing the real randomly selected number
        for (let a = 0; a < numbers.length; a ++) {
            accumulator = [];
            accumulator.push(prevValues[a]);
            for (let n = 0; n < FALSE_NUM_SIZE; n++) {
                const myNum = getNumber(minimum, maximum);
                accumulator.push(myNum);
            }
            // add the 'fake' numbers in the front of the array and place the real random number at the last position
            numbers[a] = [ ...accumulator, numbers[a][0] ];
        }

        // generate the bonusBall value if needed
        if (this.props.bonusBall) {
            const {
                bonusMinimum,
                bonusMaximum
            } = this.props;

            const prevValues = [ ...this.state.bonusValues ];
            accumulator = [];
            
            for (let b = 0; b < FALSE_NUM_SIZE; b++) {
                const bonusNum = getNumber(bonusMinimum, bonusMaximum);
                accumulator.push(bonusNum);
            }
            bonusValues = [ prevValues[prevValues.length - 1], ...accumulator, getNumber(bonusMinimum, bonusMaximum) ];
        }

        this.setState(state => {
            return {
                bonusValues,
                values: numbers,
                generatingResults: true
            }
        });

        setTimeout(() => {
            this.setState({ generatingResults: false });
        }, this.state.values.length * 210);
    };

    render() {
        const { 
            gameTitle, 
            bonusBall, 
            twoDigits 
        } = this.props;
        
        let index = -1;

        return (
            <div className="lottoGame">
                <div>
                    <h2>{gameTitle}</h2>
                    { 
                        this.state.values.map(item => {
                            index += 1;
                            return <LottoBall 
                                        key={index} 
                                        delay={index * 133} 
                                        twoDigits={twoDigits}
                                        value={item} 
                                    />
                        })
                    }
                    {
                        bonusBall ? 
                            <LottoBall 
                                key={index + 1} 
                                styles={this.props.bonusBallClassname}
                                delay={(index + 1) * 133} 
                                twoDigits={twoDigits}
                                value={this.state.bonusValues} 
                            /> : null
                    }
                </div>
                <div>
                    <button className="generateBtn" onClick={this.generate} disabled={this.state.generatingResults}>Generate Numbers</button>
                </div>
            </div>
        );
    }
}

export default LottoGameBoard;