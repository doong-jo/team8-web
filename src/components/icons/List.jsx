import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function List(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M4.6667,12.6667H14V11.3333H4.6667Zm0-4H14V7.3333H4.6667Zm0-5.3334V4.6667H14V3.3333Zm-3,1.3335h2V3.3349h-2Zm0,3.9992h2V7.334h-2Zm0,3.9991h2V11.3332h-2Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

List.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

List.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default List;
