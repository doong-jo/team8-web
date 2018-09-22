import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ViewScroll(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M4.66,7.3333,2,10l2.66,2.6667v-2H9.3333V9.3333H4.66ZM14,6,11.34,3.3333v2H6.6667V6.6667H11.34v2Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

ViewScroll.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ViewScroll.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ViewScroll;
