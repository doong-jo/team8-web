// Utility Components
import React, { Component } from 'react';
import { Button } from 'reactstrap';
// import has from 'has';
import axios from 'axios';
import PropTypes from 'prop-types';

// User-define Components
import pageStyles from '../../Page.scss';
import styles from './style.scss';
import { timeFormatter, getFullUri } from '../../Page';

import ToolBar from '../../components/common/ToolBar';
import Icon from '../../components/icons';
import { ConfirmModal } from '../../pages/components/modal/Modal';

// Open-source Components
import Table from 'rc-table';
import 'rc-table/assets/index.css';

import { compose, withProps } from 'recompose';

class DeviceView extends Component {
    constructor(props) {
        super(props);

        this.onCellConfirmMdTrigger = this.onCellConfirmMdTrigger.bind(this);
        this.onCellAcceptBtnClicked = this.onCellAcceptBtnClicked.bind(this);
        this.onStreetViewVisibleChanged = this.onStreetViewVisibleChanged.bind(this);
        this.getLocation = this.getLocation.bind(this);

        this.state = {
            
        };
        
        this.apiUri = {
            
        };
    }
    
    componentDidMount() {

    }


    render() {
        const self = this;

        return (

            <div>
                <ToolBar
                    title={this.props.pageTitle}
                />
                <section className={pageStyles.Page__content}>
                    <div>
                        
                    </div>
                </section>
                
            </div>
        );
    }
}

DeviceView.defaultProps = {
    pageTitle: 'no title',
};

DeviceView.propTypes = {
    pageTitle: PropTypes.string,
};

export default DeviceView;
