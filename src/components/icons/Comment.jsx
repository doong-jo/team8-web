import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Comment(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M14,4H12.6667v6H4v1.3333A.66864.66864,0,0,0,4.6667,12H12l2.6667,2.6667v-10A.66864.66864,0,0,0,14,4ZM11.3333,8V2a.66862.66862,0,0,0-.6666-.6667H2A.66864.66864,0,0,0,1.3333,2v9.3333L4,8.6667h6.6667A.66862.66862,0,0,0,11.3333,8Z" />
			</g>
		</IconBase>
	);
}

Comment.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Comment.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Comment;
