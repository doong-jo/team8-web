import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CaretRight(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M7.08183,11.3333,10.41513,8,7.08183,4.6667Z" />
				<path style={{ fill: 'none', opacity: 0 }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

CaretRight.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CaretRight.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CaretRight;
