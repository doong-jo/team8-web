import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Mail(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M13.3333,2.6667H2.6667A1.33153,1.33153,0,0,0,1.34,4l-.0067,8a1.33726,1.33726,0,0,0,1.3334,1.3333H13.3333A1.33726,1.33726,0,0,0,14.6667,12V4A1.33726,1.33726,0,0,0,13.3333,2.6667Zm0,2.6666L8,8.6667,2.6667,5.3333V4L8,7.3333,13.3333,4Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

Mail.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Mail.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Mail;
