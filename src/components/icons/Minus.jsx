import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Minus(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: '#fff', opacity: 0 }} width="16" height="16" />
				<polygon style={{ fillRule: 'evenodd' }} points="8.858 8.86 7.144 8.86 7.144 8.857 2 8.857 2 7.143 7.144 7.143 7.144 7.14 8.858 7.14 8.858 7.143 14 7.14 14 8.857 8.858 8.857 8.858 8.86" />
			</g>
		</IconBase>
	);
}

Minus.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Minus.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Minus;
