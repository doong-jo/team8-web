import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Bell(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M8,14.5a1.33726,1.33726,0,0,0,1.3334-1.3333H6.6667A1.33293,1.33293,0,0,0,8,14.5Zm4-4V7.1667A4.06181,4.06181,0,0,0,9,2.9534V2.5a1,1,0,0,0-2,0v.4534A4.05019,4.05019,0,0,0,4,7.1667V10.5L2.6667,11.8334V12.5H13.3334v-.6666Z" />
				<rect style={{ fill: 'none' }} width="16" height="16" />
			</g>
		</IconBase>
	);
}

Bell.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Bell.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Bell;
