import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Chapter(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M12,1.33333H4A1.33725,1.33725,0,0,0,2.66667,2.66667V13.33333A1.33725,1.33725,0,0,0,4,14.66667h8a1.33725,1.33725,0,0,0,1.33333-1.33333V2.66667A1.33725,1.33725,0,0,0,12,1.33333ZM4,2.66667H7.33333V8L5.66667,7,4,8Z" />
			</g>
		</IconBase>
	);
}

Chapter.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Chapter.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Chapter;
