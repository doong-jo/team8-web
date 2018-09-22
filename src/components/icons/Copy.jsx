import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Copy(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M10.6667.6668h-8A1.337,1.337,0,0,0,1.3334,2v9.3333H2.6667V2h8Z" />
				<path d="M5.3335,3.3333h7.3331A1.3334,1.3334,0,0,1,14,4.6667V14a1.3333,1.3333,0,0,1-1.3333,1.3333H5.3333A1.3333,1.3333,0,0,1,4,14V4.6668A1.3335,1.3335,0,0,1,5.3335,3.3333Z" />
			</g>
		</IconBase>
	);
}

Copy.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Copy.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Copy;
