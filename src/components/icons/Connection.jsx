import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Connection(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M2.6,8A2.0685,2.0685,0,0,1,4.6667,5.9333H7.3333V4.6667H4.6667a3.3333,3.3333,0,1,0,0,6.6666H7.3333V10.0667H4.6667A2.0685,2.0685,0,0,1,2.6,8Zm2.7333.6667h5.3334V7.3333H5.3333Zm6-4H8.6667V5.9333h2.6666a2.0667,2.0667,0,1,1,0,4.1334H8.6667v1.2666h2.6666a3.3333,3.3333,0,1,0,0-6.6666Z" />
			</g>
		</IconBase>
	);
}

Connection.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Connection.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Connection;
