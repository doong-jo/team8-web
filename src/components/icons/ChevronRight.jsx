import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ChevronRight(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M5.7267,11.06,8.78,8,5.7267,4.94l.94-.94,4,4-4,4Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

ChevronRight.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ChevronRight.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ChevronRight;
