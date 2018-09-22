import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import styles from './DashboardCard.scss';

function ItemToRow(props) {
    const Entries = Object.entries(props.items);
    const IsMultiRow = Entries.length > 1;
    return (
        <div>
            {Entries.map(([key, itemVal]) => (
                <Col
                    className={IsMultiRow ? styles.DashboardCard__multirow : styles.DashboardCard__singlerow}
                    key={key}
                    xs="auto"
                >
                    <span className={
                        IsMultiRow ?
                            styles.DashboardCard__multirow__value :
                            styles.DashboardCard__singlerow__value}
                    >
                        {itemVal.value}
                    </span>
                    <span className={key}>{itemVal.name}</span>
                </Col>
            ))}
        </div>
    );
}

function DashboardCard(props) {
    const MainItem = {
        items: props.mainItem,
    };
    const SubItems = {
        items: props.subItems,
    };
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle className={styles.DashboardCard__title}>
                        {props.title}
                    </CardTitle>
                    <Row className={styles.DashboardCard__row}>
                        <Col
                            className={styles.DashboardCard__leftbody}
                            xs="6"
                        >
                            {ItemToRow(MainItem)}
                        </Col>
                        <Col
                            className={styles.DashboardCard__rightbody}
                            xs="6"
                        >
                            {ItemToRow(SubItems)}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

ItemToRow.defaultProps = {
    items: {},
};

ItemToRow.propTypes = {
    items: PropTypes.shape({}),
};

DashboardCard.defaultProps = {
    title: '',
    mainItem: {},
    subItems: {},
};

DashboardCard.propTypes = {
    title: PropTypes.string,
    mainItem: PropTypes.shape({}),
    subItems: PropTypes.shape({}),
};

export default DashboardCard;
