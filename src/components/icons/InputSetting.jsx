import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function InputSetting(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M12.4167,2.6667H3.0833A1.33293,1.33293,0,0,0,1.75,4v8a1.33293,1.33293,0,0,0,1.3333,1.3333h9.3334A1.33724,1.33724,0,0,0,13.75,12V4A1.33293,1.33293,0,0,0,12.4167,2.6667Zm0,9.3333H3.0833V5.3333h9.3334Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<rect x="4.4167" y="6.666" width="6.6666" height="1.3333" />
				<rect x="4.4167" y="9.3327" width="4.6666" height="1.3333" />
			</g>
		</IconBase>
	);
}

InputSetting.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

InputSetting.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default InputSetting;
