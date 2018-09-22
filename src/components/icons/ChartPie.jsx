import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ChartPie(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M7.3333,1.3333V14.6667a6.70374,6.70374,0,0,1,0-13.3334Zm1.3534,0V7.3267h5.98A6.69623,6.69623,0,0,0,8.6867,1.3333Zm0,7.34v5.9934a6.69012,6.69012,0,0,0,5.98-5.9934Z" />
			</g>
		</IconBase>
	);
}

ChartPie.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ChartPie.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ChartPie;
