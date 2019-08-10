import React, { Component } from 'react';

import './LottoBall.css';

const DEFAULT_CLASS = ['numberList'];
const ANIMATION_CLASSES = ['animating', 'blurring'];

class LottoBall extends Component {

    state = {
        classes: DEFAULT_CLASS.join(' '),
        pendingAnimation: false,
    }

    componentDidMount() {
        this.timer = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentDidUpdate(prevProps, prevState) {

        const { value: prevVal } = prevProps;
        const { value: currentVal } = this.props;
        const { delay } = this.props;

        // if props have changed - reset the view to starting point of the animation classes/styles
        if (prevVal.length !== currentVal.length || (JSON.stringify(prevVal) !== JSON.stringify(currentVal))) {
            this.setState(({ classes: DEFAULT_CLASS.join(' '), pendingAnimation: true }));
        }

        if (this.state.pendingAnimation) {
            this.timer = setTimeout(() => {
                this.setState(state => {
                    return ({
                        classes: ANIMATION_CLASSES.join(' '),
                        pendingAnimation: false
                    })
                })
            }, delay);
        }
    }

    render() {
        const {
            styles,
            twoDigits,
            value
        } = this.props;

        const classes = ['lottoBall'];
        classes.push(styles);

        return (
            <div className="lottoBallContainer">
                <div className={classes.join(' ')}>
                    <div className="lottoLabel">
                        <ul className={this.state.classes}>
                            {
                                value.map((item, i) => {
                                    return <li key={i}>{twoDigits && item < 10 && item !== '?' ? "0" + item : item}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default LottoBall;