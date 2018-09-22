import React, { Component } from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';

import styles from './Radio.scss';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioSelected: 'none',
        };

        this.state.radioSelected = 'none';
        this.onRadioBtnClicked = this.onRadioBtnClicked.bind(this);
    }
    componentWillMount() {
        this.mounted = true;
        const radio = this.props.values[0];
        
        this.props.onChnageHandler({
            target: {
                name: this.props.fieldName,
                value: radio,
            }
        });
    }
    onRadioBtnClicked(radioSelected) {
        if (this.mounted) {
            this.setState({ radioSelected }, () => {
                this.props.onChnageHandler({
                    target: {
                        name: this.props.fieldName,
                        value: radioSelected,
                    }
                });
            });
        }
    }
    render() {
        
        return (
            <div className={this.props.className}>
                {
                    this.props.values.map((value, i) => {
                        const inputId = value.concat('Id');
                        return (
                            <div className={styles.Radio__wrapper} key={inputId}>
                                <input
                                    type="radio"
                                    className={styles.Radio__btn}
                                    id={inputId}
                                    value={value}
                                    name={this.props.fieldName}
                                    onClick={() => this.onRadioBtnClicked(value)}
                                    defaultChecked={i === 0}
                                />
                                <Label htmlFor={inputId}>{value}</Label>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

Radio.defaultProps = {
    className: '',
};

Radio.propTypes = {
    className: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
};

export default Radio;
