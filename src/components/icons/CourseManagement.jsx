import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CourseManagement(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M11.3333,8.6667H8V12h3.3333Zm-.6666-7.3334V2.6667H5.3333V1.3333H4V2.6667H3.3333A1.32722,1.32722,0,0,0,2.0067,4L2,13.3333a1.333,1.333,0,0,0,1.3333,1.3334h9.3334A1.33726,1.33726,0,0,0,14,13.3333V4a1.33724,1.33724,0,0,0-1.3333-1.3333H12V1.3333Zm2,12H3.3333V6h9.3334Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

CourseManagement.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CourseManagement.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CourseManagement;
