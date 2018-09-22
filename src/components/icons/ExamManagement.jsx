import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ExamManagement(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M12.6667,2H9.88A1.99208,1.99208,0,0,0,6.12,2H3.3333A1.33726,1.33726,0,0,0,2,3.33335V14a1.33726,1.33726,0,0,0,1.3333,1.3334h9.3334A1.33726,1.33726,0,0,0,14,14V3.33335A1.33726,1.33726,0,0,0,12.6667,2ZM8,2a.6667.6667,0,1,1-.6667.6667A.66864.66864,0,0,1,8,2Zm4.6667,12H3.3333V3.33335H4.6667v2h6.6666v-2h1.3334Z" />
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
			</g>
		</IconBase>
	);
}

ExamManagement.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ExamManagement.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ExamManagement;
