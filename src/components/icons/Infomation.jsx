import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Infomation(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M8,1.3333A6.6667,6.6667,0,1,0,14.66673,8,6.66916,6.66916,0,0,0,8,1.3333Zm.6667,10H7.33333v-4h1.3334Zm0-5.3333H7.33333V4.6667h1.3334Z" />
			</g>
		</IconBase>
	);
}

Infomation.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Infomation.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Infomation;
