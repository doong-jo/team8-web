import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ChevronLeft(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M10.2733,11.06,7.22,8l3.0533-3.06L9.3333,4l-4,4,4,4Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

ChevronLeft.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ChevronLeft.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ChevronLeft;
