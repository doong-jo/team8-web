import React from 'react';
import PropTypes from 'prop-types';
import IconBase from 'react-icon-base';

function Preset(props) {
	return (
		<IconBase viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g>
				<rect style={{ fill: '#fff', opacity: 0 }} width="16" height="16" />
				<path d="M4.03818,8.60376H.88888V7.39624H4.03818ZM10.53964,3.371H.88888V4.57862h9.65076ZM.88888,12.62891H7.492V11.42139H.88888ZM9.62533,10.917a.2.2,0,0,0-.2-.2H8.2a.2.2,0,0,0-.2.2V13.1333a.2.2,0,0,0,.2.2H9.42538a.2.2,0,0,0,.2-.2v-.50439h5.48584V11.42139H9.62533Zm3.04761-7.546V2.86664a.2.2,0,0,0-.2-.2H11.24765a.2.2,0,0,0-.2.2V5.083a.2.2,0,0,0,.2.2H12.473a.2.2,0,0,0,.2-.2V4.57862h2.43823V3.371ZM6.17148,6.89179a.2.2,0,0,0-.20007-.2H4.74606a.2.2,0,0,0-.20007.2V9.10816a.20005.20005,0,0,0,.20007.2H5.9714a.20005.20005,0,0,0,.20007-.2V8.60376h8.9397V7.39624H6.17148Z" />
			</g>
		</IconBase>
	);
}

Preset.defaultProps = {
	size: '1rem',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Preset.propTypes = {
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Preset;
