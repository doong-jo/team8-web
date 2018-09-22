import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Refresh(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M11.7666,4.2334a5.33425,5.33425,0,1,0,1.3867,5.1H11.7666A3.99809,3.99809,0,1,1,8,4a3.94319,3.94319,0,0,1,2.8133,1.1867L8.6666,7.3334h4.6667V2.6667Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

Refresh.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Refresh.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Refresh;
