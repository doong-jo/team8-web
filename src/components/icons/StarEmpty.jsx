import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function StarEmpty(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M4.8166,13.66434a.46573.46573,0,0,1-.69151-.50241l.80573-3.609L2.15765,7.10677a.46573.46573,0,0,1,.26413-.81292l3.68135-.34895L7.57261,2.55156a.46573.46573,0,0,1,.85475,0L9.89683,5.94491l3.68135.34895a.46573.46573,0,0,1,.26414.81292L11.06915,9.55292l.80573,3.609a.46573.46573,0,0,1-.69151.50241L8,11.7828Zm2.74893-2.70675a.85384.85384,0,0,1,.8689,0l2.297,1.35766-.58139-2.60414a.85384.85384,0,0,1,.26851-.82637l2.001-1.76506L9.76326,6.86788a.85384.85384,0,0,1-.703-.51072L8,3.90863,6.93966,6.35716a.85384.85384,0,0,1-.703.51072l-2.65635.25179,2.001,1.76506a.85383.85383,0,0,1,.2685.82637l-.58139,2.60414Z" />
				<rect style={{ fill: 'none', opacity: 0 }} width="16" height="16" />
			</g>
		</IconBase>
	);
}

StarEmpty.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

StarEmpty.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default StarEmpty;
