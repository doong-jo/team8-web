import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CourseHistory(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M11.3333,7.3333H4.6667V8.6667h6.6666Zm1.3334-4.6666H12V1.3333H10.6667V2.6667H5.3333V1.3333H4V2.6667H3.3333A1.32722,1.32722,0,0,0,2.0067,4L2,13.3333a1.333,1.333,0,0,0,1.3333,1.3334h9.3334A1.33726,1.33726,0,0,0,14,13.3333V4A1.33724,1.33724,0,0,0,12.6667,2.6667Zm0,10.6666H3.3333V6h9.3334ZM9.3333,10H4.6667v1.3333H9.3333Z" />
			</g>
		</IconBase>
	);
}

CourseHistory.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CourseHistory.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CourseHistory;
