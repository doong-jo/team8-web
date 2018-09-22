import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CourseSetting(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M11.02,8.04l-.7067-.7067L7.06,10.5867,5.6467,9.1733,4.94,9.88,7.06,12Zm1.6467-5.3733H12V1.3333H10.6667V2.6667H5.3333V1.3333H4V2.6667H3.3333A1.32722,1.32722,0,0,0,2.0067,4L2,13.3333a1.333,1.333,0,0,0,1.3333,1.3334h9.3334A1.33726,1.33726,0,0,0,14,13.3333V4A1.33724,1.33724,0,0,0,12.6667,2.6667Zm0,10.6666H3.3333V6h9.3334Z" />
			</g>
		</IconBase>
	);
}

CourseSetting.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CourseSetting.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CourseSetting;
