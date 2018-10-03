import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ExclamationCircle(props) {
	return (
		<IconBase viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path
                    fill="#ff0000"
                    d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
			</g>
		</IconBase>
	);
}

ExclamationCircle.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ExclamationCircle.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ExclamationCircle;