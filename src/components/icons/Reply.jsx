import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Reply(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M12.66667,10l-4,4L7.72,13.05333l2.39333-2.38667H2.66667v-8H4V9.33333h6.11333L7.72,6.94667,8.66667,6Z" />
			</g>
		</IconBase>
	);
}

Reply.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Reply.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Reply;
