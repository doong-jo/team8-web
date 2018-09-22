import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Movie(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: '#fff', opacity: 0 }} width="16" height="16" />
				<path style={{ fillRule: 'evenodd' }} d="M6.40083,5.45521v5.08991L10.4,8.00044,6.40137,5.45521Zm6.6,6.04479v1h1v-1Zm0-2v1h1v-1Zm0-2v1h1v-1Zm0-2v1h1v-1Zm0-2v1h1v-1Zm-11,8v1h1v-1Zm0-2v1h1v-1Zm0-2v1h1v-1Zm0-2v1h1v-1Zm0-2v1h1v-1ZM14.00052,2.4a1,1,0,0,1,1,1L15,12.59244a1,1,0,0,1-.99948,1l-12,.00735H2a1,1,0,0,1-1-1L1.00052,3.4a1,1,0,0,1,1-1Z" />
			</g>
		</IconBase>
	);
}

Movie.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Movie.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Movie;
