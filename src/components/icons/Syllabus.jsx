import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Syllabus(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: 'none' }} width="16" height="16" />
				<rect style={{ fill: 'none' }} width="16" height="16" />
				<path d="M8.6667,8h4.6666V9H8.6667Zm0-1.6667h4.6666v1H8.6667Zm0,3.3334h4.6666v1H8.6667Zm5.3333-7H2A1.33724,1.33724,0,0,0,.6667,4v8.6667A1.33724,1.33724,0,0,0,2,14H14a1.33724,1.33724,0,0,0,1.3333-1.3333V4A1.33724,1.33724,0,0,0,14,2.6667Zm0,10H8V4h6Z" />
			</g>
		</IconBase>
	);
}

Syllabus.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Syllabus.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Syllabus;
