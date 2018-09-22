import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Image(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: '#fff', opacity: 0 }} width="16" height="16" />
				<path style={{ fillRule: 'evenodd' }} d="M6.52531,9.12122l3.3707-3.268,2.73864,2.65535v2.85955H3.36535V10.1425L5.472,8.1ZM4.6293,7.283A1.23876,1.23876,0,0,1,3.734,6.92555a1.20654,1.20654,0,0,1,0-1.73623,1.23884,1.23884,0,0,1,.89533-.35741,1.239,1.239,0,0,1,.8954.35741,1.20648,1.20648,0,0,1,0,1.73623A1.23857,1.23857,0,0,1,4.6293,7.283ZM2.7,3.6a.5.5,0,0,0-.5.5v7.8a.5.5,0,0,0,.5.5H13.3a.5.5,0,0,0,.5-.5V4.1a.5.5,0,0,0-.5-.5ZM2,2.4H14a1,1,0,0,1,1,1v9.2a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V3.4A1,1,0,0,1,2,2.4Z" />
			</g>
		</IconBase>
	);
}

Image.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Image.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Image;
