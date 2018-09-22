import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Circle(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: '#fff', opacity: 0 }} width="16" height="16" />
				<path style={{ fillRule: 'evenodd' }} d="M7.99265,1.00052A6.99948,6.99948,0,1,0,15,7.99947a6.99563,6.99563,0,0,0-7.00735-6.999M8,13.59989a5.5999,5.5999,0,1,1,5.59937-5.60042A5.598,5.598,0,0,1,8,13.59989" />
			</g>
		</IconBase>
	);
}

Circle.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Circle.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Circle;
