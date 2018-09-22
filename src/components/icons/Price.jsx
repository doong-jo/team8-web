import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Price(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<path d="M14.6662,2.8209H13.2744l-.8975,3.6459H9.8757L8.8441,2.8209H7.1978L6.152,6.4668H3.5803L2.7395,2.8209H1.3335l.9749,3.6459H1.3335v.9538H2.5629l.2755,1.0385H1.3335v.9611H3.0856l1.0033,3.7589H5.4882l1.06-3.7589H9.4521l1.0458,3.7589H11.812l1.0457-3.7589h1.8088V8.4591H13.1122l.2897-1.0385h1.2646V6.4668H13.6488ZM4.7677,11.7303q-.127-.6855-.5088-2.3104H5.3468Q5.015,10.67735,4.7677,11.7303Zm.8408-3.2712H4.0542L3.8139,7.4206H5.8982ZM7.9894,4.0783q.085.36045.6431,2.3882H7.3395Q7.86945,4.70025,7.9894,4.0783ZM6.8095,8.4591l.2828-1.0385H8.9011l.2897,1.0385Zm4.3242,3.2712q-.099-.6855-.4522-2.3104h1.0033Zm.763-3.2712H10.4554l-.2897-1.0385H12.158Z" />
				<rect style={{ fill: 'none' }} width="16" height="16" />
			</g>
		</IconBase>
	);
}

Price.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Price.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Price;
