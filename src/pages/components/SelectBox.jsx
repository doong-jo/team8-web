import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import styles from './SelectBox.scss';


class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);

        this.state = {
            selectValue: '',
        };

        this.clearable = false;
        this.rtl = false;
        this.searchable = false;
    }
    componentDidMount() {

    }
    updateValue(newValue) {
        this.setState({
            selectValue: newValue.value,
        }, () => {
            if (!this.state.selectValue) {
                return;
            }
            if (!this.props.changeHandler) {
                return;
            }
            this.props.changeHandler({
                target:
                    {
                        name: this.props.fieldName,
                        value: this.state.selectValue,
                        label: newValue.label,
                    },
            });
        });
    }
    selectValue(selectValue) {
        console.log('Select value : ', selectValue);
    }
    render() {
        const onBlurResetsInput = false;
        const onSelectResetsInput = false;
        return (
            <Select
                className={[this.props.className, styles.SelectBox].join(' ')}
                id="state-select"
                ref={(ref) => { this.select = ref; }}
                onBlurResetsInput={onBlurResetsInput}
                onSelectResetsInput={onSelectResetsInput}
                autoFocus
                options={this.props.options}
                clearable={this.clearable}
                value={this.state.selectValue}
                name={this.props.fieldName}
                onChange={this.updateValue}
                rtl={this.rtl}
                searchable={this.searchable}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                changeHandler={this.props.changeHandler}
            />
        );
    }
}

SelectBox.defaultProps = {
    className: '',
    placeholder: 'Select...',
};

SelectBox.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
};

export default SelectBox;
