import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function MinusCircle(props) {
	return (
		<IconBase viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path
                    fill="#ff0000"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" />
			</g>
		</IconBase>
	);
}

MinusCircle.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

MinusCircle.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default MinusCircle;
