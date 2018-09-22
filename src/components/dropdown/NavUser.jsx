import React from 'react';
import PropTypes from 'prop-types';
// import styles from './NavNotice.css';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem } from 'reactstrap';
import IconInCircle from '../common/IconInCircle';
import styles from './NavUser.scss';
import Icon from '../icons';

function NavUser(props) {
	return (
		<UncontrolledDropdown nav={props.nav}>
			<DropdownToggle nav={props.nav} caret>
				<IconInCircle iconId="user" />
				<span className={`user-name ${styles.UserName}`}>
					{ props.name }
				</span>
				<Icon iconId="chevron-down" />
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem>
					로그아웃
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	);
}

NavUser.defaultProps = {
	nav: false,
};

NavUser.propTypes = {
	nav: PropTypes.bool,
};

export default NavUser;
