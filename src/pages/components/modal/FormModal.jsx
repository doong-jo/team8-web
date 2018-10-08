import React from 'react';
import PropTypes from 'prop-types';
import has from 'has';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Row,
    Col,
    Label,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { CommonModal } from './Modal';
import styles from './FormModal.scss';
import confirmModalStyles from './ConfirmModal.scss';
import Radio from '../Radio';
// import ImageSlider from '../ImageSlider';
// import ImageUploader from '../ImageUploader';
import SelectBox from '../SelectBox';
// import SelectItemAddList from '../SelectItemAddList';
import { getISOToDateTimeLocale } from '../../../Page';

const labelGridRatio = 2;
const smGridRatio = 3;
const mdGridRatio = 4;
const lgGridRatio = 10;

const InputFields = (props) => {
    let inputField;
    let imgSlide;

    switch (props.inputField.shape) {
    case 'Input':
        inputField = (
            <AvField
                className={styles['FormModal__content__col-item']}
                key={props.labelFieldText}
                type="text"
                name={props.inputField.fieldName}
                onBlur={props.changeHandler}
                value={props.fetchData}
            />
        );
        break;

    case 'InputArea':
        inputField = (
            <AvField
                className={styles['FormModal__content__col-item']}
                key={props.labelFieldText}
                type="textarea"
                name={props.inputField.fieldName}
                onBlur={props.changeHandler}
                value={props.fetchData}
            />
        );
        break;

    case 'InputNumeric':
        inputField = (
            <AvField
                className={styles['FormModal__content__col-item']}
                key={props.labelFieldText}
                type="number"
                min={0}
                max={10}
                name={props.inputField.fieldName}
                onBlur={props.changeHandler}
                value={props.fetchData}
            />
        );
        break;

    case 'Date':
        inputField = (
            <AvField
                key={props.labelFieldText}
                type="datetime-local"
                name={props.inputField.fieldName}
                onBlur={props.changeHandler}
                value={getISOToDateTimeLocale(props.fetchData)}
            />
        );
        break;

    // For Object inputField
    default:
        // Dynamic length InputField
        if (typeof (props.inputField) === 'object') {
            switch (props.inputField.shape.type) {
            case 'Radio':

                inputField = props.inputField.shape.items.map((item) => {
                    const inputId = props.inputField.fieldName.concat(item.values).concat('Id');
                    return (
                        <Radio
                            className={styles['FormModal__content__col-item']}
                            key={inputId}
                            values={item.values}
                            fieldName={props.inputField.fieldName}
                            onChnageHandler={props.changeHandler}
                            value={props.fetchData}
                        />
                    );
                });
                break;

            case 'Select':
                inputField = props.inputField.shape.items.map(item => (
                    <Col className={styles['FormModal__content__inline-col']} key={item.value}>
                        <SelectBox
                            fieldName={props.inputField.fieldName.concat('-').concat(item.fieldName)}
                            placeholder={item.placeholder}
                            className={styles['FormModal__content__col-item']}
                            options={item.value}
                            onBlur={props.changeHandler}
                            value={props.fetchData}
                        />
                    </Col>
                ));
                break;

            // case 'SelectItemAddLlist':
            //     inputField = (
            //         <SelectItemAddList
            //             fieldName={props.inputField.fieldName}
            //             selectClassName={styles['FormModal__content__col-item']}
            //             rowClassName={styles['FormModal__content__inline-row']}
            //             colClassName={styles['FormModal__content__inline-col']}
            //             btnColClassName={[styles['FormModal__content__inline-col'], styles['FormModal__content__col-item']].join(' ')}
            //             selectItems={props.inputField.shape.items}
            //             removeItemBtnTxt={props.inputField.shape.exceptionBtnTxt}
            //             onChangeHandler={props.changeHandler}
            //             value={props.fetchData}
            //         />
            //     );
            //     break;
            // case 'ImageUpload':
            //     inputField = (
            //         <ImageUploader
            //             fieldName={props.inputField.fieldName}
            //             multiSize={props.inputField.shape.multiSize}
            //             dynamicSize={props.inputField.shape.dynamicSize}
            //             src={props.inputField.shape.src}
            //             smSrc={props.inputField.shape.smSrc}
            //             mdSrc={props.inputField.shape.mdSrc}
            //             lgSrc={props.inputField.shape.lgSrc}
            //             onChangeHandler={props.changeHandler}
            //             value={props.fetchData}
            //         />
            //     );
            //     break;

            default: break;
            }
        }
        break;
    }

    return inputField;
};

class FormModalBodyRow extends React.PureComponent {
    render() {
        return (
            <FormGroup
                row
                key={this.props.labelFieldText}
            >
                <Label
                    for={this.props.labelFieldText}
                    sm={this.props.labelFieldGrid}
                >
                    {this.props.labelFieldText}
                </Label>
                <Col sm={this.props.inputFieldGrid}>
                    {
                        <InputFields
                            changeHandler={this.props.changeHandler}
                            {...this.props}
                        />
                    }
                </Col>
            </FormGroup>
        );
    }
}

FormModalBodyRow.defaultProps = {
    labelFieldGrid: 2,
    inputFieldGrid: 5,
    labelFieldText: 'none',
};

FormModalBodyRow.propTypes = {
    labelFieldGrid: PropTypes.number,
    inputFieldGrid: PropTypes.number,
    labelFieldText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

class FormModal extends CommonModal {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onNestedModalTrigger = this.onNestedModalTrigger.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);

        this.state = {
            formData: {},
            isOpenNested: false,
        };

        this.nested = false;
    }
    createForm(Items, changeHandler) {
        return (
            <AvForm>
                {
                    Object.entries(Items).map(([key, value]) => {
                        let inputGridRatio = 0;
                        let fetchData = '';

                        if (has(this.props, 'fetchData') && this.props.fetchData) {
                            fetchData = this.props.fetchData[value.fieldName];
                        }

                        switch (value.shape) {
                        case 'Input':
                        case 'InputNumeric': inputGridRatio = smGridRatio; break;
                        case 'Date': inputGridRatio = mdGridRatio; break;
                        default: inputGridRatio = lgGridRatio; break;
                        }
                        return (
                            <FormModalBodyRow
                                key={key}
                                labelFieldText={key}
                                labelFieldGrid={labelGridRatio}
                                inputFieldGrid={inputGridRatio}
                                inputField={value}
                                changeHandler={changeHandler}
                                fetchData={fetchData}
                            />
                        );
                    })
                }
            </AvForm>
        );
    }
    componentWillMount() {
        this.mounted = true;
    }

    handleInputChange(e) {
        if (this.mounted) {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [e.target.name]: e.target.value,
                },
            }, () => {
                this.props.onFormDataChange(this.state.formData);
            });
        }
    }
    onNestedModalTrigger() {
        this.setState(prevState => (
            { isOpenNested: !prevState.isOpenNested }
        ));
    }
    onCloseModal() {
        this.setState({
            formData: {},
        });
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    fade={this.props.fade}
                    backdrop={this.props.backdrop}
                    size={this.props.size}
                    onClosed={this.onCloseModal}
                >
                    <ModalHeader toggle={this.props.onClose}>
                        {this.props.modalHeader}
                    </ModalHeader>
                    <ModalBody>
                        {this.createForm(this.props.modalFormItems, this.handleInputChange)}
                        {this.props.modalBody}
                    </ModalBody>
                    <ModalFooter>
                        {this.props.cancelBtn &&
                            <Button color="default" onClick={this.props.onCancel}>
                                {this.props.modalCancelBtnTxt}
                            </Button>
                        }
                        <Button color="primary" onClick={this.props.isNested ? this.onNestedModalTrigger : this.props.onAccept}>
                            {this.props.modalAcceptBtnTxt}
                        </Button>
                        {this.props.isNested &&
                            <Modal
                                isOpen={this.state.isOpenNested}
                                fade={false}
                                backdrop={this.props.backdrop}
                                size="md"
                            >
                                <ModalHeader>{this.props.nestedModalHeader}</ModalHeader>
                                <ModalBody className={confirmModalStyles.ConfirmModal__modalBody}>
                                    {this.props.nestedModalIcon}
                                    {this.props.nestedModalIcon &&
                                        <div>
                                            <br />
                                        </div>
                                    }

                                    {this.props.nestedModalBody}
                                </ModalBody>
                                <ModalFooter>
                                    {this.props.nestedCancelBtn &&
                                        <Button color="default" onClick={this.onNestedModalTrigger}>
                                            {this.props.modalCancelBtnTxt}
                                        </Button>
                                    }
                                    <Button color="primary" onClick={(e) => { this.props.onAccept(); this.onNestedModalTrigger(); }}>
                                        {this.props.nestedModalAcceptBtnTxt}
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

FormModal.defaultProps.cancelBtn = false;
FormModal.defaultProps.modalCancelBtnTxt = '취소';

FormModal.defaultProps.nestedModalBody = '계속하시겠습니까?';
FormModal.defaultProps.nestedModalHeader = '재확인';
FormModal.defaultProps.nestedModalAcceptBtnTxt = '승인';
FormModal.defaultProps.nestedCancelBtn = false;

FormModal.propTypes.cancelBtn = PropTypes.bool;
FormModal.propTypes.modalCancelBtnTxt = PropTypes.string;
FormModal.propTypes.onCancel = PropTypes.func;
FormModal.propTypes.modalFormItems = PropTypes.object;
FormModal.propTypes.nestedModalBody = PropTypes.any;
FormModal.propTypes.nestedModalHeader = PropTypes.string;
FormModal.propTypes.nestedModalAcceptBtnTxt = PropTypes.string;
FormModal.propTypes.nestedCancelBtn = PropTypes.bool;

export default FormModal;
