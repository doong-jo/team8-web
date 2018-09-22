import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Times(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M12.6666,4.2733l-.94-.94L8,7.06,4.2733,3.3333l-.94.94L7.06,8,3.3333,11.7267l.94.94L8,8.94l3.7266,3.7267.94-.94L8.94,8Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

Times.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Times.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Times;
