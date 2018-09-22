import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function PracticeContents(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<clipPath id="clip-path"><rect style={{ fill: 'none' }} width="16" height="16" /></clipPath>
			<g style={{ clipPath: 'url(#clip-path)' }}>
				<path d="M14,3.3333A7.87061,7.87061,0,0,0,11.6667,3,6.20065,6.20065,0,0,0,8,4,6.20065,6.20065,0,0,0,4.3333,3,6.20013,6.20013,0,0,0,.6667,4v9.7667A.35843.35843,0,0,0,1,14.1c.0667,0,.1-.0333.1667-.0333a8.13582,8.13582,0,0,1,3.1666-.7334,6.20065,6.20065,0,0,1,3.6667,1,8.0309,8.0309,0,0,1,3.6667-1,6.78518,6.78518,0,0,1,3.1666.7A.3001.3001,0,0,0,15,14.0667a.35844.35844,0,0,0,.3333-.3334V4A4.54775,4.54775,0,0,0,14,3.3333Zm0,9A7.74759,7.74759,0,0,0,11.6667,12,8.02967,8.02967,0,0,0,8,13V5.3333a8.0309,8.0309,0,0,1,3.6667-1A7.74449,7.74449,0,0,1,14,4.6667Z" />
			</g>
		</IconBase>
	);
}

PracticeContents.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

PracticeContents.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default PracticeContents;
