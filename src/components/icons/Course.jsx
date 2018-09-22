import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Course(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M6,7.3333H4.6667V8.6667H6Zm2.6667,0H7.33333V8.6667h1.3334Zm2.6666,0H10V8.6667h1.3333Zm1.3334-4.6666H12V1.3333h-1.3333V2.6667H5.33333V1.3333H4V2.6667H3.3333A1.32722,1.32722,0,0,0,2.0067,4L2,13.3333a1.333,1.333,0,0,0,1.3333,1.3334h9.33343A1.33726,1.33726,0,0,0,14,13.3333V4A1.33724,1.33724,0,0,0,12.66673,2.6667Zm0,10.6666H3.3333V6h9.33343Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

Course.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Course.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Course;
