import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Emergency(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path 
                    fill="#f0ad4e"
                    d="M2209,2244.22a43.5,43.5,0,1,0,43.5,43.5A43.5,43.5,0,0,0,2209,2244.22Zm0,78.85a35.35,35.35,0,1,1,35.34-35.35A35.35,35.35,0,0,1,2209,2323.07Zm0-59.77c-3.12,0-5.47,1.63-5.47,4.25v24.09c0,2.63,2.35,4.25,5.47,4.25s5.47-1.69,5.47-4.25v-24.09C2214.49,2265,2212.06,2263.3,2209,2263.3Zm0,38a5.43,5.43,0,1,0,5.43,5.43A5.44,5.44,0,0,0,2209,2301.32Z" transform="translate(-2165.52 -2244.22)"
                    />
			</g>
		</IconBase>
	);
}

Emergency.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Emergency.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Emergency;



// <svg id="레이어_1" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 87"><defs><style>.cls-1{fill:#040000;}</style></defs><title>cautionn</title><path class="cls-1" d="M2209,2244.22a43.5,43.5,0,1,0,43.5,43.5A43.5,43.5,0,0,0,2209,2244.22Zm0,78.85a35.35,35.35,0,1,1,35.34-35.35A35.35,35.35,0,0,1,2209,2323.07Zm0-59.77c-3.12,0-5.47,1.63-5.47,4.25v24.09c0,2.63,2.35,4.25,5.47,4.25s5.47-1.69,5.47-4.25v-24.09C2214.49,2265,2212.06,2263.3,2209,2263.3Zm0,38a5.43,5.43,0,1,0,5.43,5.43A5.44,5.44,0,0,0,2209,2301.32Z" transform="translate(-2165.52 -2244.22)"/></svg>