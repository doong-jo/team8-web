import React from 'react';
// import PropTypes from 'prop-types';
import { InputGroup, Input } from 'reactstrap';
import styles from './SearchInput.scss';
import Icon from '../icons';

function SearchInput() {
	return (
		<InputGroup className={styles.SearchInput}>
			<Input className="gr-custom-input" placeholder="과목명을 입력해주세요." />
			<span className={`input-label-addon ${styles.SearchInput__icon}`}>
				<Icon iconId="search" />
			</span>
		</InputGroup>
		
	);
}

export default SearchInput;
