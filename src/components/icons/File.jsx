import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function File(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M9.3333,1.3334H4A1.33153,1.33153,0,0,0,2.6733,2.6667L2.6666,13.3334a1.3316,1.3316,0,0,0,1.3267,1.3333H12a1.33724,1.33724,0,0,0,1.3333-1.3333v-8ZM10.6666,12H5.3333V10.6667h5.3333Zm0-2.6666H5.3333V8h5.3333ZM8.6666,6V2.3334L12.3333,6Z" />
			</g>
		</IconBase>
	);
}

File.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

File.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default File;
