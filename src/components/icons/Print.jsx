import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Print(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M12.66673,5.3333H3.3333a1.99742,1.99742,0,0,0-2,2v4H4V14h8V11.3333h2.6667v-4A1.99741,1.99741,0,0,0,12.66673,5.3333Zm-2,7.3334H5.3333V9.3333h5.33343Zm2-4.6667a.66665.66665,0,1,1,.6666-.6667A.66864.66864,0,0,1,12.66673,8ZM12,2H4V4.6667h8Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

Print.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Print.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Print;
