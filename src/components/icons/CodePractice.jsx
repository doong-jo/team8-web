import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function CodePractice(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M6.2667,11.0667,3.2,8,6.2667,4.9333,5.33327,4l-4,4,4,4Zm3.4666,0L12.8,8,9.7333,4.9333,10.6667,4l4,4-4,4Z" />
			</g>
		</IconBase>
	);
}

CodePractice.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

CodePractice.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default CodePractice;
