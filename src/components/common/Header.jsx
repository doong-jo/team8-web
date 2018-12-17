import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
    Badge,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import NavNotice from '../dropdown/NavNotice';
import NavUser from '../dropdown/NavUser';
import styles from './Header.scss';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    
    render() {
        return (
            <Navbar color="white" light expand="md" className={styles.Header}>
                <NavbarBrand href="/">
                    
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavUser name={window.APP_INITIAL_STATE.userName} nav />
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;
