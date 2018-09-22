import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Menu(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M10.3333,9.3334H9.8066l-.1866-.18a4.341,4.341,0,1,0-.4667.4666l.18.1867v.5267L12.6666,13.66l.9934-.9933Zm-4,0a3,3,0,1,1,3-3A2.996,2.996,0,0,1,6.3333,9.3334Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
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
