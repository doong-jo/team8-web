import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ZoomIn(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M10.3333,9.3334H9.8067l-.1867-.18a4.341,4.341,0,1,0-.4667.4666l.18.1867v.5267L12.6667,13.66l.9933-.9933Zm-4,0a3,3,0,1,1,3-3A2.996,2.996,0,0,1,6.3333,9.3334Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M8,6.6667H6.6667V8H6V6.6667H4.6667V6H6V4.6667h.6667V6H8Z" />
			</g>
		</IconBase>
	);
}

ZoomIn.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ZoomIn.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ZoomIn;
