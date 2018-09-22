import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ViewExpand(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<clipPath id="clip-path"><rect style={{ fill: 'none' }} width="16" height="16" /></clipPath>
			<g style={{ clipPath: 'url(#clip-path)' }}>
				<path d="M10,2l1.5333,1.5333L9.6066,5.4467l.9467.9466,1.9133-1.9266L14,6V2ZM2,6,3.5333,4.4667,5.4466,6.3933l.9467-.9466L4.4666,3.5333,6,2H2Zm4,8L4.4666,12.4667l1.9267-1.9134-.9467-.9466L3.5333,11.5333,2,10v4Zm8-4-1.5334,1.5333L10.5533,9.6067l-.9467.9466,1.9267,1.9134L10,14h4Z" />
			</g>
			<g style={{ clipPath: 'url(#clip-path)' }}>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

ViewExpand.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ViewExpand.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ViewExpand;
