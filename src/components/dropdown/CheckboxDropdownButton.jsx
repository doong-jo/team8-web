import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from '../icons';
import './CheckboxDropDownButton.css';

class CheckboxDropdownButton extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }
    toggle() {
        console.log("dropdown toggle됨");
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }), () => {
            console.log("dropdownOpen : ", this.state.dropdownOpen, "state : ", this.state);
        });
    }
    handleCheckboxChange(value, name, label) {
        // this.setState({
        //     isCheckedDict: [label: ]
        // });
    }
    render() {
        const divStyle = {
            marginRight: '10px',
            float: 'left',
        };
        return (
            <div
                className='CheckboxDropdownButton'
                style={divStyle}
            >
                <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                >
                    <DropdownToggle
                        color='default'
                    >
                        {this.props.title}
                        <Icon iconId="chevron-down" />
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.props.items.map((item) => (
                            <Checkbox
                                key={item.localizedLabel}
                                label={item.localizedLabel}
                                value={item.value}
                                name={item.name}
                                handleCheckboxChange={this.props.handleCheckboxChange}
                            />
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(e) {
        const { handleCheckboxChange, value, name, label } = this.props;
        this.setState(prevState => ({
            isChecked: !prevState.isChecked,
        }), () => {
            handleCheckboxChange(value, name, label);
        });
    }
    render() {
        const { label, value } = this.props;
        const { isChecked } = this.state;
        const checkboxDivStyle = {
            padding: '7px',
            cursor: 'pointer',
        };
        const labelStyle = {
            cursor: 'pointer',
        };
        const inputStyle = {
            marginRight: '5px',
        };
        console.log(isChecked);
        return (
            <div
                className="checkbox"
                style={checkboxDivStyle}
                onClick={this.toggle}
            >
                <span style={labelStyle}>
                    <input
                        type="checkbox"
                        value={value}
                        checked={isChecked}
                        style={inputStyle}
                    />
                    {label}
                </span>
            </div>
        );
    }
}

CheckboxDropdownButton.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        localizedLabel: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })).isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
}

Checkbox.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
}

export default CheckboxDropdownButton;