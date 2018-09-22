import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon, Input, InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from '../icons';
import './SearchDropdownInput.css';

class SearchDropdownInput extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.onDropdownItemClicked = this.onDropdownItemClicked.bind(this);
        this.state = {
            dropdownOpen: false,
            currentSearchOption: props.currentSearchOption,
        };
    }
    toggleDropDown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    }
    onDropdownItemClicked(e) {
        const { handleSearchOptionChange } = this.props;
        this.setState({
            currentSearchOption: e.currentTarget.textContent
        }, () => {
            handleSearchOptionChange(this.state.currentSearchOption);
        });
    }
    render() {
        const divStyle = {
            float: 'left',
            display: 'inline-block',
        };
        return (
            <div className='SearchDropdownInput' style={divStyle}>
                <InputGroup>
                    <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle color='default'>
                            {this.state.currentSearchOption}
                            <Icon iconId="chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.props.searchOptions.map((option) => (
                                <DropdownItem
                                    key={option}
                                    onClick={this.onDropdownItemClicked}
                                >
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                    <Input />
                    <InputGroupAddon addonType="append">
                        <Button color="default">
                            검색
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}

SearchDropdownInput.propTypes = {
    currentSearchOption: PropTypes.string,
    searchOptions: PropTypes.arrayOf(PropTypes.string),
    handleSearchOptionChange: PropTypes.func.isRequired,
}

export default SearchDropdownInput;