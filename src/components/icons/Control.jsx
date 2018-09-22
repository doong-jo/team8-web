import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Control(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M4.6667,6.16683,8,2.83353l3.3333,3.3333Z" />
				<path d="M4.6667,9.83318,8,13.16648l3.3333-3.3333Z" />
			</g>
		</IconBase>
	);
}

Control.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Control.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Control;
