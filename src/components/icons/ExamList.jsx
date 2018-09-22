import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function ExamList(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path style={{ fill: 'none' }} d="M0,0H16V16H0Z" />
				<path d="M14,2H2A1.33724,1.33724,0,0,0,.6667,3.3333v9.3334A1.33724,1.33724,0,0,0,2,14H14a1.33724,1.33724,0,0,0,1.3333-1.3333V3.3333A1.33724,1.33724,0,0,0,14,2ZM8,7.3333H2V6H8ZM8,4.6667H2V3.3333H8Z" />
			</g>
		</IconBase>
	);
}

ExamList.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

ExamList.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default ExamList;
