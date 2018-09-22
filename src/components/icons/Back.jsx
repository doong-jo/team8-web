import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Back(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M8.3333,5.3333a6.97625,6.97625,0,0,0-4.6,1.7334l-2.4-2.4v6h6L4.92,8.2533a5.314,5.314,0,0,1,8.48,2.4134l1.58-.52A7.00924,7.00924,0,0,0,8.3333,5.3333Z" />
			</g>
		</IconBase>
	);
}

Back.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Back.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Back;
