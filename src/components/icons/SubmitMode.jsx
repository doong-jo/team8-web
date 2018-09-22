import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function SubmitMode(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M12.6667,12.6667H3.3333V3.3333H8V2H3.3333A1.33293,1.33293,0,0,0,2,3.3333v9.3334A1.33293,1.33293,0,0,0,3.3333,14h9.3334A1.33724,1.33724,0,0,0,14,12.6667V8H12.6667ZM9.3333,2V3.3333h2.3934L5.1733,9.8867l.94.94,6.5534-6.5534V6.6667H14V2Z" />
			</g>
		</IconBase>
	);
}

SubmitMode.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

SubmitMode.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default SubmitMode;
