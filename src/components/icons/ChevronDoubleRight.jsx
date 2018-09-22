import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ChevronDoubleRight(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M16,16H0V0H16Z" />
				<path d="M7.81,4.94,10.8633,8,7.81,11.06l.94.94,4-4-4-4Z" />
				<path d="M3.25,4.94,6.3033,8,3.25,11.06l.94.94,4-4-4-4Z" />
			</g>
		</IconBase>
	);
}

ChevronDoubleRight.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ChevronDoubleRight.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ChevronDoubleRight;
