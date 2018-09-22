import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Help(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M12.66667,1.33333H3.33333A1.333,1.333,0,0,0,2,2.66667V12a1.333,1.333,0,0,0,1.33333,1.33333H6l2,2,2-2h2.66667A1.33725,1.33725,0,0,0,14,12V2.66667A1.33725,1.33725,0,0,0,12.66667,1.33333ZM8.66667,12H7.33333V10.66667H8.66667Zm1.38-5.16667-.6.61333a2.26952,2.26952,0,0,0-.78,1.88667H7.33333V9a2.68338,2.68338,0,0,1,.78-1.88667l.82667-.84a1.30353,1.30353,0,0,0,.39333-.94,1.33333,1.33333,0,0,0-2.66667,0H5.33333a2.66667,2.66667,0,0,1,5.33333,0A2.12136,2.12136,0,0,1,10.04667,6.83333Z" />
			</g>
		</IconBase>
	);
}

Help.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Help.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Help;
