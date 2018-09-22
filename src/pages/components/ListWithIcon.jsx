import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListWithIcon.scss';
import Icon from '../../components/icons';

function ListWithIcon(props) {
    const { list, iconId, iconOnClick } = props;
    return (
        <div>
            {list.length > 0 ? (
                <ul
                    className={`list-group ${styles.ListWithIcon__list}`}
                >
                    {list.map(item => (
                        <li
                            key={item}
                            className="list-group-item"
                        >
                            <Icon
                                className={styles.ListWithIcon__icon}
                                iconId={iconId}
                                onClick={() => { iconOnClick(item); }}
                            />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            ) : null }
        </div>
    );
}

ListWithIcon.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    iconId: PropTypes.string.isRequired,
    iconOnClick: PropTypes.func.isRequired,
};

export default ListWithIcon;
