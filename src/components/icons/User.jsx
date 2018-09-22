import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function User(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M8,8A2.66665,2.66665,0,1,0,5.3333,5.3333,2.666,2.666,0,0,0,8,8ZM8,9.3333c-1.78,0-5.3333.8934-5.3333,2.6667v1.3333H13.3333V12C13.3333,10.2267,9.78,9.3333,8,9.3333Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

User.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

User.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default User;
