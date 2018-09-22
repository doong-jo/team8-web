import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Confirm(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M6,10.78,3.22,8l-.9466.94L6,12.6667l8-8-.94-.94Z" />
			</g>
		</IconBase>
	);
}

Confirm.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Confirm.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Confirm;
