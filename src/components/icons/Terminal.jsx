import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Terminal(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M1.3333,4.9333,4.4,8,1.3333,11.0667,2.2667,12l4-4-4-4ZM6.2344,12h8.4323V10.6631H6.2344Z" />
			</g>
		</IconBase>
	);
}

Terminal.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Terminal.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Terminal;
