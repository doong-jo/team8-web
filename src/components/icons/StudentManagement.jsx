import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function StudentManagement(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M3.3333,8.7867v2.6666L8,14l4.6667-2.5467V8.7867L8,11.3333ZM8,2,.6667,6,8,10l6-3.2733v4.6066h1.3333V6Z" />
			</g>
		</IconBase>
	);
}

StudentManagement.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

StudentManagement.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default StudentManagement;
