import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import CheckboxDropdownButton from '../dropdown/CheckboxDropdownButton';
import SearchDropdownInput from '../dropdown/SearchDropdownInput';
import Icon from '../icons';
import styles from './ToolBar.scss';

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isRendering = (component) => {
            return component ? true : false;
        };
        return (
            <section className={`ToolBar ${styles.ToolBar}`}>
                <div className={`ToolBarTitle ${styles.ToolBar__container}`}>
                    <h3 className={styles.ToolBar__title}>{this.props.title}</h3>
                    {
                    <div className={styles.ToolBar__tools}>
                        {
                            isRendering(this.props.checkboxDropdownButtons) ? this.props.checkboxDropdownButtons && this.props.checkboxDropdownButtons.map((button) => 
                                <CheckboxDropdownButton
                                    key={button.title}
                                    title={button.title}
                                    items={button.items}
                                    handleCheckboxChange={this.props.handleCheckboxChange}
                                />
                            ) : null
                        }
                        {
                            isRendering(this.props.searchDropdownInput) ? (
                                <SearchDropdownInput
                                    {...this.props.searchDropdownInput}
                                />
                            ) : null
                        }
                        {
                            isRendering(this.props.refreshButton) ? (
                                <div className={styles.ToolBar__refresh}>
                                    <Button color="default">
                                        <Icon iconId="refresh" />
                                    </Button>
                                </div>
                            ) : null
                        }
                    </div>
                    }
                </div>
            </section>
        )
    }
}

ToolBar.propTypes = {
    title: PropTypes.string.isRequired,
    checkboxDropdownButtons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            localizedLabel: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        })).isRequired,
    })),
    searchDropdownInput: PropTypes.shape({
        currentSearchOption: PropTypes.string,
        searchOptions: PropTypes.arrayOf(PropTypes.string),
        handleSearchOptionChange: PropTypes.func.isRequired,
    }),
    refreshButton: PropTypes.bool,
    handleCheckboxChange: PropTypes.func,
}

export default ToolBar;