import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Complete(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M8,1.3334A6.66665,6.66665,0,1,0,14.6666,8,6.66907,6.66907,0,0,0,8,1.3334Zm-1.3334,10L3.3333,8l.94-.94L6.6666,9.4467l5.06-5.06.94.9467Z" />
			</g>
		</IconBase>
	);
}

Complete.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Complete.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Complete;
