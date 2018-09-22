import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Row,
    Col,
    Label,
} from 'reactstrap';

import SelectBox from './SelectBox';
import styles from './SelectItemAddList.scss';
import Icon from '../../components/icons';

class SelectItemAddList extends Component {
    constructor(props) {
        super(props);
        this.selectBoxChnageHandler = this.selectBoxChnageHandler.bind(this);
        this.onAddItemBtnClicked = this.onAddItemBtnClicked.bind(this);
        this.onRemoveItemBtnClicked = this.onRemoveItemBtnClicked.bind(this);
        this.addListItem = this.addListItem.bind(this);
        
        this.state = {
            selectState: {},
            itemList: [],
        };
    }
    componentDidMount() {
        if( this.props.value ) {
            this.props.value.map(value => {
                this.addListItem(value);
            })
        }
    }
    onAddItemBtnClicked() {
        this.addListItem(Object.entries(this.state.selectState).map(([key, value]) => {
            return value;
        }));
    }
    onRemoveItemBtnClicked(i) {
        let removeIndex = -1;
        this.state.itemList.map((value, index) => {
            if( value.key === JSON.stringify(i) ){
                removeIndex = index;
            }
        });

        if( removeIndex === -1 ) { return; }
        
        // have to new array in state array (slice function create new array)
        let beforeItemList = this.state.itemList.slice();
        beforeItemList.splice(removeIndex, 1);

        this.setState({
            itemList: beforeItemList
        }, () => {
                this.props.onChangeHandler({
                    target: {
                        name: this.props.fieldName,
                        value: this.state.itemList.map(obj => {
                            const value = JSON.parse(obj.key);
                            return value;
                        }),
                    }
                });
            }
        );
    }
    addListItem(vals) {
        const labelVal = vals.map(val => {
            const result = {
                label: val.label,
                component: (
                    <Label>{val.label}</Label>
                ),
            };
            return result;
        });
        
        const colItems = this.props.selectItems.map((item, i) => {
            if( labelVal.length <= i ) {
                labelVal.push({
                    label: '',
                    component: (
                        <Label></Label>
                    ),
                });
            }
            return (
                <Col key={'ItemList__Item-'.concat(labelVal[i].label)} className={styles['SelectItemAddList__content__col-item']}>
                    {labelVal[i].component}
                </Col>
            );
        });
        
        const valueArr = vals.map(val => { return val.value; });

        const wrapRowItem = 
            <Row key={JSON.stringify(valueArr)} className={[this.props.rowClassName, styles.SelectItemAddList__content__row].join(' ')}>
                {colItems}
                <Col className={styles['SelectItemAddList__content__col-item-lastbtn']} xs="auto">
                    <Button color="danger" onClick={this.onRemoveItemBtnClicked.bind(this, valueArr)}>
                        {this.props.removeItemBtnTxt}
                    </Button>
                </Col>
            </Row>;

        this.setState(prevState => ( {
            itemList: [...prevState.itemList, wrapRowItem]
            
            }), () => {
                this.props.onChangeHandler({
                    target: {
                        name: this.props.fieldName,
                        value: this.state.itemList.map(obj => {
                            const value = JSON.parse(obj.key);
                            return value;
                        }),
                    }
                });
            }
        );
    }
    selectBoxChnageHandler(e) {
        this.setState({
            selectState: {
                ...this.state.selectState,
                [e.target.name]: {value: e.target.value, label: e.target.label},
            },
        });
    }
    render() {
        const selectList = this.props.selectItems.map(item => (
            <Col key={'SelectBox-'.concat(item.placeholder)} className={this.props.colClassName}>
                <SelectBox
                    placeholder={item.placeholder}
                    className={this.props.selectClassName}
                    options={item.value}
                    fieldName={this.props.fieldName.concat('-').concat(item.fieldName)}
                    changeHandler={this.selectBoxChnageHandler}
                    disabled={item.disabled}
                />
            </Col>
        ));
        return (
            <div>
                <Row className={this.props.rowClassName}>
                    {selectList}
                    <Col className={this.props.btnColClassName} xs="auto">
                        <Button color="secondary" onClick={this.onAddItemBtnClicked}>
                            추가
                        </Button>
                    </Col>
                </Row>
                {this.state.itemList}
            </div>
        );
    }
}

SelectItemAddList.defaultProps = {
    
};

SelectItemAddList.propTypes = {
    
};

export default SelectItemAddList;
