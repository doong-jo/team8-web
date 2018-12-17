// Utility Components
import React from 'react';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

// User-define Components
import 'rc-table/assets/index.css';
import styles from './style.scss';
import { getFullUri } from '../../../Page';
import ToolBar from '../../../components/common/ToolBar';
import TablePagination from '../../components/TablePagination';

// Open-source Components
import Table from 'rc-table';
import axios from 'axios';

class UserManager extends React.Component{
    constructor(props){
        super(props);
        
        const constants = {
            TABLE_COLUMS : [
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key:'email',
                    width: 150,
                    
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key:'name',
                    width: 150,
                },
                {
                    title: 'Phone',
                    dataIndex: 'phone',
                    key:'phone',
                    width: 150,
                    
                },
                {
                    title: 'Riding_Type',
                    dataIndex: 'riding_type',
                    key:'riding_type',
                    width: 150,
                },
                {
                    title: 'Emergency',
                    dataIndex: 'emergency',
                    key:'emergency',
                    width: 150,
                },
            ],
            PAGE_COUNT: 5,
            PAGE_SIZE: 10,
        };
    
        this.CONST = constants;
                
        this.apiUri = {
            user: '/user',
            userCount: '/user/count',
        };
        
        this.state = {
            userListTableData:[],
            totalPageCount: 0,
            currentPage: 0,
            startPage: 0,
            endPage: 0,
        };
        
        this.getTotalPageCount();
        this.getUserList();
    }
    
    async getTotalPageCount(){//get total pageCount using total number of users
        const queryObj = {};
        axios.get(getFullUri(this.apiUri.userCount,queryObj))
            .then((res) => {
                let totalPageCount = Math.ceil(res.data / this.CONST.PAGE_SIZE);
                this.setState(prevState => ({
                    ...prevState,
                    totalPageCount : totalPageCount,
                    endPage : this.CONST.PAGE_COUNT < totalPageCount ? this.CONST.PAGE_COUNT-1 : Math.max(0,totalPageCount-1),
                }));
            });
    }
    
    
    getUserList(index){//get userlist from db
        const queryObj = {
            sort: "email",
            order:1,
            skip:index !== undefined ? this.CONST.PAGE_SIZE*index : 0,
            limit:this.CONST.PAGE_SIZE,
        };
        
        axios.get(getFullUri(this.apiUri.user,queryObj))
            .then((res) => {
                let result = res.data;
                
                let newUserListTableData = [];
                for(var i=0 ; i<result.length ; i++){
                    const pivot = result[i];
                    newUserListTableData[i]= {
                        key: i,
                        email: pivot.email,
                        name: pivot.name,
                        phone: pivot.phone,
                        riding_type: pivot.riding_type,
                        emergency:pivot.emergency === undefined ? '' : pivot.emergency.toString(),
                    };
                }
                
                const setCurrentPage = (startPage, endPage) => {
                    this.setState(prevState => ({
                        ...prevState,
                        startPage : startPage !== undefined ? startPage : this.state.startPage,
                        endPage : endPage !== undefined ? endPage : this.state.endPage,
                        userListTableData : newUserListTableData,
                        currentPage : index !== undefined ? index : 0,
                    }));
                }
                
                //page setState
                if(index>this.state.endPage){
                    if(index+this.CONST.PAGE_COUNT-1 <= this.state.totalPageCount){
                        setCurrentPage(index, index+this.CONST.PAGE_COUNT-1);
                    }else{
                        setCurrentPage(index, this.state.totalPageCount-1);
                    }
                }else if(index<this.state.startPage){
                    setCurrentPage(this.state.startPage-this.CONST.PAGE_COUNT, parseInt(index / this.CONST.PAGE_COUNT)+this.CONST.PAGE_COUNT-1);
                }else{
                    setCurrentPage();
                }
            });
    }
    
    render() {
        return(
            <div>
                <ToolBar title={this.props.pageTitle}/>
                <Table className={styles.UserManager__dataTable} columns={this.CONST.TABLE_COLUMS} data={this.state.userListTableData} />
                <TablePagination
                    startPage={this.state.startPage}
                    endPage={this.state.endPage}
                    currentPage={this.state.currentPage}
                    totalPageCount={this.state.totalPageCount}
                    pageOnClick= {(index) => {
                        this.getUserList(index);
                    }}
                />
            </div>
        );
    }
}

export default UserManager;