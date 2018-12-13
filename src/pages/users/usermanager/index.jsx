// Utility Components
import React from 'react';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

// User-define Components
import 'rc-table/assets/index.css';
import styles from './style.scss';
import { getFullUri } from '../../../Page';
import ToolBar from '../../../components/common/ToolBar';

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
            PAGE_COUNT:5,
            PAGE_SIZE:10,
        };
    
        this.CONST = constants;
                
        this.apiUri = {
            user: '/user',
            userCount: '/user/count',
        };
        
        this.state = {
            userListTableData:[],
            currentPage: 0,
            totalPageCount: 0,
            startPage:0,
            endPage: this.CONST.PAGE_COUNT-1,
        };
        this.getTotalPageCount();
        this.getUserList();
    }
    
    async getTotalPageCount(){//get total pageCount using total number of users
        const queryObj = {};
        axios.get(getFullUri(this.apiUri.userCount,queryObj))
            .then((res)=>{
                this.setState(prevState=>({
                    ...prevState,
                    totalPageCount : Math.ceil(res.data / this.CONST.PAGE_SIZE),
                }));
            });
    }
    
    
    getUserList(index){//get userlist from db
        const queryObj = {
            sort: "email",
            order:1,
            skip:index!==undefined?this.CONST.PAGE_SIZE*index:0,
            limit:this.CONST.PAGE_SIZE,
        };
        
        axios.get(getFullUri(this.apiUri.user,queryObj))
            .then((res)=>{
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
                        emergency: pivot.emergency===undefined ? '' : pivot.emergency.toString(),
                    };
                }
                
                this.setState(prevState => ({
                    ...prevState,
                    userListTableData: newUserListTableData,
                }));
            });
        
    }
    
    handleClick(e,index){
        e.preventDefault();
        this.setState(prevState=>({
            ...prevState,
            currentPage: index,
        }));
        
        this.getUserList(index);
    }
    
    handlePreNextClick(e,index){
        e.preventDefault();
        if(index>this.state.endPage){
            if(index+this.CONST.PAGE_COUNT-1<=this.state.totalPageCount){
                this.setState(prevState =>({
                    ...prevState,
                    startPage:index,
                    currentPage: index,
                    endPage: index+this.CONST.PAGE_COUNT-1,
                }));
            }else{
                this.setState(prevState =>({
                    ...prevState,
                    startPage:index,
                    currentPage: index,
                    endPage: this.state.totalPageCount-1,
                }));
            }
        }else if(index<this.state.startPage){
            this.setState(prevState => ({
                ...prevState,
                endPage: parseInt(index/this.CONST.PAGE_COUNT)+this.CONST.PAGE_COUNT-1,
                startPage:this.state.startPage-this.CONST.PAGE_COUNT,
                currentPage: index,
            }));    
        }else{
            this.setState(prevState=>({
                ...prevState,
                currentPage: index,
            }));
        }
        this.getUserList(index);
    }
    
    
    render() {
        return(
            <div>
                <ToolBar title={this.props.pageTitle}/>
                <Table className={styles.UserManager__dataTable} columns={this.CONST.TABLE_COLUMS} data={this.state.userListTableData} />
                <div className={styles.UserManager__pagination__wrapper}>
                    <Pagination className={styles.UserManager__pagination}>
                        <PaginationItem disabled={this.state.currentPage<=0}>
                            <PaginationLink previous href="#"
                                onClick={e => this.handlePreNextClick(e, this.state.currentPage - 1)}/>
                        </PaginationItem>
                        {[...Array(this.state.endPage-this.state.startPage+1)].map((page, i) => 
                            <PaginationItem active={(i+this.state.startPage) === this.state.currentPage} key={i+this.state.startPage}>
                                <PaginationLink onClick={e => this.handleClick(e, this.state.startPage+i)} href="#">
                                    {this.state.startPage + i+1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem disabled={this.state.currentPage+1 >= this.state.totalPageCount}>
                            <PaginationLink next href="#"
                                onClick={e => this.handlePreNextClick(e, this.state.currentPage + 1)}/>
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
        );
    }
}

export default UserManager;