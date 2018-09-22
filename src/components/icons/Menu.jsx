import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Menu(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M2,12H14V10.6667H2ZM2,8.6667H14V7.3333H2ZM2,4V5.3333H14V4Z" />
			</g>
		</IconBase>
	);
}

Menu.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Menu.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Menu;
