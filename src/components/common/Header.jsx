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
import SearchInput from './SearchInput';
import styles from './Header.scss';
// import logo from '../../../public/images/logo_goorm_color.svg';

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
	// <img className={`HeaderLogo ${styles.Header__logo}`} src={logo} alt="구름 ADMIN" />
	render() {
		return (
			<Navbar color="white" light expand="md" className={styles.Header}>
				<NavbarBrand href="/">
					
				</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					{/*
					<SearchInput />
					*/}
					<Nav className="ml-auto" navbar>
						{/*
						<NavItem>
							<Badge className={styles.Header__navlink__role} color="light" pill>관리자</Badge>
							<NavLink href="/" className={styles.Header__navlink} style={{ paddingLeft: '0.25rem' }}>
								채널관리
							</NavLink>
						</NavItem>
						<NavItem>
							<Badge className={styles.Header__navlink__role} color="light" pill>강사</Badge>
							<NavLink href="/" className={styles.Header__navlink} style={{ paddingLeft: '0.25rem' }}>
								과목관리ㅁㄴㅇㄹ
							</NavLink>
						</NavItem>
						<NavItem>
							<Badge className={styles.Header__navlink__role} color="light" pill>학생</Badge>
							<NavLink href="/" className={styles.Header__navlink} style={{ paddingLeft: '0.25rem' }}>
								수강정보
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">도움말</NavLink>
						</NavItem>
						<NavNotice nav />
						*/
						}
						<NavUser name={window.APP_INITIAL_STATE.userName} nav />
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default Header;
