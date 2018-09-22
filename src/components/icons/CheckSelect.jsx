import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CheckSelect(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: '#fff', opacity: 0 }} width="16" height="16" />
				<path style={{ fillRule: 'evenodd' }} d="M10.20449,5.2898,6.66658,8.61418l-.87186-.81825a1.09879,1.09879,0,0,0-1.4871,0,.94723.94723,0,0,0,0,1.39735L5.923,10.7102a1.09878,1.09878,0,0,0,1.4871,0l4.28146-4.02306a.9456.9456,0,0,0,0-1.39735A1.09878,1.09878,0,0,0,10.20449,5.2898Z" />
			</g>
		</IconBase>
	);
}

CheckSelect.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CheckSelect.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CheckSelect;
