import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class CommonModal extends React.PureComponent {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.modalShow}
                    fade={this.props.fade}
                    backdrop={this.props.backdrop}
                    size={this.props.size}
                >
                    <ModalHeader toggle={this.props.onClose}>
                        {this.props.modalHeader}
                    </ModalHeader>
                    <ModalBody>
                        {this.props.modalBody}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.onAccept}>
                            {this.props.modalAcceptBtnTxt}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

CommonModal.defaultProps = {
    size: 'lg',
    backdrop: true,
    fade: true,

    modalShow: false,
    modalHeader: 'Default Modal header',
    modalBody: 'Default Modal body',
    modalAcceptBtnTxt: 'Default Accept',
};

CommonModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    modalShow: PropTypes.any,
    modalHeader: PropTypes.string,
    modalBody: PropTypes.any,
    modalAcceptBtnTxt: PropTypes.string,

    size: PropTypes.string,
    backdrop: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['static']),
    ]),
    fade: PropTypes.bool,
};

export default CommonModal;
