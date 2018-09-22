import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Exam(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M13.66667,7.33333h-1V4.66667a1.33725,1.33725,0,0,0-1.33333-1.33333H8.66667v-1a1.66667,1.66667,0,0,0-3.33333,0v1H2.66667A1.33156,1.33156,0,0,0,1.34,4.66667V7.2h.99333a1.8,1.8,0,0,1,0,3.6h-1v2.53333a1.33725,1.33725,0,0,0,1.33333,1.33333H5.2v-1a1.8,1.8,0,1,1,3.6,0v1h2.53333a1.33725,1.33725,0,0,0,1.33333-1.33333V10.66667h1a1.66667,1.66667,0,0,0,0-3.33333Z" />
			</g>
		</IconBase>
	);
}

Exam.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Exam.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Exam;
