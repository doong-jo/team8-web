import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

import { ConfirmModal } from './modal/Modal';

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            clicked: false,
            
            confirmModalShow: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onConfirmModalTrigger = this.onConfirmModalTrigger.bind(this);
        this.onAccept = this.onAccept.bind(this);
    }
    handleChange(checked) {
        this.setState(prevState => ({
            confirmModalShow : !prevState.confirmModalShow,
            clicked: !prevState.clicked,
        }), () => {
            console.log('clicked : ', this.state.clicked);
        });
    }
    onAccept() {
        this.setState(prevState => ({
            confirmModalShow: !prevState.confirmModalShow,
            checked: !prevState.checked,
        }), () => {
            this.props.onAccept(this.state.checked);
        });
    }
    onConfirmModalTrigger() {
        this.setState(prevState => ({
            confirmModalShow : !prevState.confirmModalShow,
        }));
    }     
    render() {
        const IconStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 15,
            color: 'white',
            paddingRight: 2,
        };
        const confirmationModal = this.props.confirmationModal;
        
        return (
            <div>
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    uncheckedIcon={
                        <div
                            style={IconStyle}
                        >
                            {this.props.uncheckedText}
                        </div>
                    }
                    checkedIcon={
                        <div
                            style={IconStyle}
                        >
                            {this.props.checkedText}
                        </div>
                    }
                    className="react-switch"
                    id="icon-switch"
                />
                {this.props.confirmModal &&
                    <ConfirmModal
                        isOpen={this.state.confirmModalShow}
                        fade={false}
                        backdrop
                        centered
                        size="md"
                        modalHeader="확인"
                        modalBody="상태를 변경하시겠습니까?"
                        confirmIcon={this.props.confirmIcon}
                        onClose={this.onConfirmModalTrigger}
                        cancelBtn
                        cancelBtnTxt="취소"
                        onAccept={this.onAccept}
                        acceptBtnTxt="승인"
                    />
                }
            </div>
        );
    }
}

ToggleSwitch.defaultProps = {
    checkedText: 'On',
    uncheckedText: 'Off',
    confirmationModal: false,
};

ToggleSwitch.propTypes = {
    checked: PropTypes.bool.isRequired,
    checkedText: PropTypes.string,
    uncheckedText: PropTypes.string,
    confirmationModal: PropTypes.bool,
    warningContent: PropTypes.any,
};

export default ToggleSwitch;
