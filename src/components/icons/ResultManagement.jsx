import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ResultManagement(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M12.6667,2H3.3333A1.33724,1.33724,0,0,0,2,3.3333v9.3334A1.33724,1.33724,0,0,0,3.3333,14h9.3334A1.33724,1.33724,0,0,0,14,12.6667V3.3333A1.33724,1.33724,0,0,0,12.6667,2ZM6,11.3333H4.6667V6.6667H6Zm2.6667,0H7.3333V4.6667H8.6667Zm2.6666,0H10V8.6667h1.3333Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

ResultManagement.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ResultManagement.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ResultManagement;
