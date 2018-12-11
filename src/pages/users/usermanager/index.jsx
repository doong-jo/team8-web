// Utility Components
import React from 'react';

// User-define Components
import 'rc-table/assets/index.css';
import styles from './style.scss';
import { getFullUri } from '../../../Page';

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
                }
            ],
        };
    
        this.CONST = constants;
        this.state = {userListTableData:[]};
        
        this.apiUri = {
            user: '/user',
        };
        this.getUserList();
    }
    
    getUserList(){
        console.log("loadUserInfoData...");
        const queryObj = {
            sort: "email",
            order:1,
            limit:10,
        };
        
        axios.get(getFullUri(this.apiUri.user,queryObj))
            .then((res)=>{
                let result = res.data;
                
                let newUserListTableData = [];
                for(var i=0; i<result.length;i++){
                    const pivot = result[i];
                    newUserListTableData[i]= {
                        key: i,
                        email: pivot.email,
                        name: pivot.name,
                        phone: pivot.phone,
                        riding_type: pivot.riding_type,
                        emergency:pivot.emergency,
                    };
                    console.log('phone number>>>'+pivot.phone);
                }
                
                this.setState(prevState => ({
                    ...prevState,
                    userListTableData: newUserListTableData,
                }));
            });
        
    }
    render() {
        return(
            <div>
                <Table className={styles.UserManager__dataTable} columns={this.CONST.TABLE_COLUMS} data={this.state.userListTableData} />
            </div>
        );
    }
}

export default UserManager;