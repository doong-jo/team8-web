import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function StarFill(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M4.8166,13.66434a.46573.46573,0,0,1-.69151-.50241l.80573-3.609L2.15765,7.10677a.46573.46573,0,0,1,.26413-.81292l3.68135-.34895L7.57261,2.55156a.46573.46573,0,0,1,.85475,0L9.89683,5.94491l3.68135.34895a.46573.46573,0,0,1,.26414.81292L11.06915,9.55292l.80573,3.609a.46573.46573,0,0,1-.69151.50241L8,11.7828Z" />
				<rect style={{ fill: 'none', opacity: 0 }} width="16" height="16" />
			</g>
		</IconBase>
	);
}

StarFill.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

StarFill.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default StarFill;
