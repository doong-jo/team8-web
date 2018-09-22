import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CaretLeft(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M8.91817,11.3333,5.58487,8l3.3333-3.3333Z" />
				<path style={{ fill: 'none', opacity: 0 }} d="M16,0H0V16H16Z" />
			</g>
		</IconBase>
	);
}

CaretLeft.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CaretLeft.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CaretLeft;
