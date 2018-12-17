// Utility Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

// User-define Components
import styles from './TablePagination.scss';

class TablePagination extends Component {
    constructor(props) {
        super(props);
    }
    
    handleClick(e,index){
        e.preventDefault();
        this.props.pageOnClick(index);
    }
        
    handlePreNextClick(e,index){
        e.preventDefault();
        this.props.pageOnClick(index);
    }
    
    render() {
        console.log(this.props);
        return (
            <Pagination className={styles.TablePagination}>
                <PaginationItem disabled={this.props.currentPage<=0}>
                    <PaginationLink previous href="#"
                        onClick={e => this.handlePreNextClick(e, this.props.currentPage - 1)}/>
                </PaginationItem>
                {[...Array(this.props.endPage-this.props.startPage+1)].map((page, i) => 
                    <PaginationItem active={(i+this.props.startPage) === this.props.currentPage} key={i+this.props.startPage}>
                        <PaginationLink onClick={e => this.handleClick(e, this.props.startPage+i)} href="#">
                            {this.props.startPage + i+1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem disabled={this.props.currentPage+1 >= this.props.totalPageCount}>
                    <PaginationLink next href="#"
                        onClick={e => this.handlePreNextClick(e, this.props.currentPage + 1)}/>
                </PaginationItem>
            </Pagination>
        );
    }
}

TablePagination.defaultProps = {
    className : '',
}

TablePagination.propTypes = {
    startPage : PropTypes.number,
    endPage : PropTypes.number,
    currentPage : PropTypes.number,
    totalPageCount : PropTypes.number,
    pageOnClick : PropTypes.func,
};

export default TablePagination;