import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ZoomOut(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M10.3334,9.3334H9.8067l-.1867-.18a4.33989,4.33989,0,1,0-.4666.4666l.18.1867v.5267L12.6667,13.66l.9933-.9933Zm-4,0a3,3,0,1,1,3-3A2.996,2.996,0,0,1,6.3334,9.3334ZM4.6667,6H8v.6667H4.6667Z" />
			</g>
		</IconBase>
	);
}

ZoomOut.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ZoomOut.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ZoomOut;
