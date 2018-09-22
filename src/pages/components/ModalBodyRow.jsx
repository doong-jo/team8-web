import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label } from 'reactstrap';

function ModalBodyRow(props) {
    return (
        <FormGroup
            row
            key={props.labelFieldText}
        >
            <Label
                for={props.labelFieldText}
                sm={props.labelFieldGrid}
            >
                {props.localizedLabelFieldText === '' ? props.labelFieldText : props.localizedLabelFieldText}
            </Label>
            <Col sm={props.inputFieldGrid}>
                {props.inputField}
            </Col>
        </FormGroup>
    );
}

ModalBodyRow.propTypes = {
    labelFieldText: PropTypes.string.isRequired,
    localizedLabelFieldText: PropTypes.string,
    labelFieldGrid: PropTypes.number,
    inputField: PropTypes.element.isRequired,
    inputFieldGrid: PropTypes.number,
};

ModalBodyRow.defaultProps = {
    labelFieldGrid: 2,
    inputFieldGrid: 10,
    localizedLabelFieldText: '',
};

export default ModalBodyRow;
