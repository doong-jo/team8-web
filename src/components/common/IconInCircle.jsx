import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import styles from './IconInCircle.scss';
import Icon from '../icons';

function IconInCircle({
	size, hasBadge, badgeNum, dark, ...iconProps
}) {
	const iconSize = { sm: '16px', md: '25px', lg: '30px' };
	const darkClass = dark ? styles.dark : '';
	const circleClasses = `${styles.IconInCircle} ${styles[size]} ${darkClass}`;
	return (
		<span className={circleClasses}>
			<Icon size={iconSize[size]} {...iconProps} />
			{hasBadge ? <Badge color="danger" className={styles[`IconInCircle__badge--${size}`]} pill>{badgeNum > 999 ? '999+' : badgeNum}</Badge> : null}
		</span>
	);
}

IconInCircle.defaultProps = {
	size: 'sm',
	hasBadge: false,
	badgeNum: 0,
	dark: false,
};

IconInCircle.propTypes = {
	size: PropTypes.string, // ['sm', md', 'lg']
	hasBadge: PropTypes.bool,
	badgeNum: PropTypes.number,
	dark: PropTypes.bool,
	...Icon.propTypes,
};

export default IconInCircle;
