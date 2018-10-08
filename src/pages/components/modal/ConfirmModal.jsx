import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CommonModal from './CommonModal';
import styles from './ConfirmModal.scss';

class ConfirmModal extends CommonModal {
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                fade={this.props.fade}
                backdrop={this.props.backdrop}
                centered={this.props.centered}
                size={this.props.size}
                onClose={this.props.onClose}
            >
                <ModalHeader>{this.props.modalHeader}</ModalHeader>
                <ModalBody className={styles.ConfirmModal__modalBody}>
                    {this.props.confirmIcon}
                    {this.props.confirmIcon &&
                        <div>
                            <br />
                        </div>
                    }
                    {this.props.modalBody}
                </ModalBody>
                <ModalFooter>
                    {this.props.cancelBtn &&
                        <Button color="default" onClick={this.props.onClose}>
                            {this.props.cancelBtnTxt}
                        </Button>
                    }
                    <Button color="primary" onClick={this.props.onAccept}>
                        {this.props.acceptBtnTxt}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ConfirmModal;
