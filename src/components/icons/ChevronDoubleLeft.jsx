import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ChevronDoubleLeft(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M8.19,11.06,5.1367,8,8.19,4.94,7.25,4l-4,4,4,4Z" />
				<path d="M12.75,11.06,9.6967,8,12.75,4.94,11.81,4l-4,4,4,4Z" />
			</g>
		</IconBase>
	);
}

ChevronDoubleLeft.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ChevronDoubleLeft.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ChevronDoubleLeft;
