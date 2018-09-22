import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function MarkMode(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M12.6667,3.3333v9.3334H3.3333V3.3333h9.3334m0-1.3333H3.3333A1.33724,1.33724,0,0,0,2,3.3333v9.3334A1.33724,1.33724,0,0,0,3.3333,14h9.3334A1.33724,1.33724,0,0,0,14,12.6667V3.3333A1.33724,1.33724,0,0,0,12.6667,2Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M6.9179,8.9662,5.263,7.3113l-.9466.94,2.6015,2.6016,4.7657-4.7658-.94-.94Z" />
			</g>
		</IconBase>
	);
}

MarkMode.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

MarkMode.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default MarkMode;
