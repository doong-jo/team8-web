import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Flag(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M9.6,4,9.3333,2.6667h-6V14H4.6667V9.3333H8.4l.2667,1.3334h4.6666V4Z" />
			</g>
		</IconBase>
	);
}

Flag.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Flag.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Flag;
