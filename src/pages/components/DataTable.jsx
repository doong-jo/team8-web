import React from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';

import styles from './DataTable.scss';
import { getFullUri } from '../../Page';

const ajaxLoader = require('../../../public/images/ajax_loader.gif');

const getMuiTheme = (isFetching, _createMuiTheme) =>
    _createMuiTheme({
        overrides: {
            MuiTable: {
                root: {
                    backgroundImage: `url(${ajaxLoader})`,
                    backgroundRepeat: isFetching ? 'no-repeat' : null,
                    backgroundPosition: isFetching ? 'center center' : null,
                    backgroundSize: isFetching ? '108px, 108px' : '0, 0',
                },
            },
            MuiTableBody: {
                root: {
                    opacity: isFetching ? '0.4' : null,
                },
            },
            MuiTableCell: {
                head: {
                    padding: '0px',
                },
                body: {
                    padding: '0px',
                },
            },
            MuiPaper: {
                root: {
                    paddingBottom: '25px',
                },
            },
        },
    });


const defaultTableQuery = {
    limit: 10,
    order: 1,
};

const defaultPaginationOffset = 10;
const defaultPaginationRange = 5;

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.fetchTableCount = this.fetchTableCount.bind(this);
        this.fetchTableData = this.fetchTableData.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.refreshTable = this.refreshTable.bind(this);

        this.state = {
            table: {
                columns: [],
                data: [],
                options: {
                    pagination: false,
                    search: false,
                    filter: false,
                },
            },
            pagination: {
                activePage: 1,
                totalItemsCount: 0,
            },
        };

        this.tableDefaultQuery = defaultTableQuery;
        this.tablePaginationOffset = defaultPaginationOffset;
        this.tablePaginationRange = defaultPaginationRange;

        this.state.isFetching = true;
    }

    componentDidMount() {
        const queryObj = {
            ...this.state.defaultQuery,
            skip: (this.state.pagination.activePage - 1) * this.tablePaginationOffset,
        };
        this.fetchTableData(this.props.tableDataApiUri, queryObj);
        this.fetchTableCount(this.props.paginationCntApiUri, {});
    }
    
    componentWillReceiveProps(nextProps) {
        if( this.props.refreshSignal !== nextProps.refreshSignal ) {
            const fetchUri = this.props.refreshInfo.fetchTableApi;
            const countUri = this.props.refreshInfo.fetchCountApi;
            
            this.refreshTable(fetchUri, countUri);
        }
    }
    
    onPaginationChange(pageNumber) {
        const queryObj = {
            ...this.tableDefaultQuery,
            skip: (pageNumber - 1) * this.tablePaginationOffset,
        };
        this.setState({
            pagination: {
                ...this.state.pagination,
                activePage: pageNumber,
            },
            isFetching: true,
        }, () => {
            this.fetchTableData(this.props.tableDataApiUri, queryObj);
        });
    }

    async fetchTableData(apiUriPrefix, queryObj) {
        await axios.get(getFullUri(apiUriPrefix, queryObj))
            .then((res) => {
                this.setState(prevState => ({
                    ...prevState,
                    table: {
                        ...prevState.table,
                        data: res.data,
                    },
                    isFetching: false,
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async fetchTableCount(apiUriPrefix, queryObj) {
        await axios.get(getFullUri(apiUriPrefix, queryObj))
            .then((res) => {
                this.setState(prevState => ({
                    ...prevState,
                    pagination: {
                        ...prevState.pagination,
                        totalItemsCount: res.data,
                    },
                    // tableFetchCountUriPrefix: apiUriPrefix,
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshTable(fetchDataUriPrefix, fetchCountUriPrefix) {
        const queryObj = {
            ...this.tableDefaultQuery,
            skip: (this.state.pagination.activePage - 1) * this.tablePaginationOffset,
        };
        this.fetchTableData(fetchDataUriPrefix, queryObj);
        this.fetchTableCount(fetchCountUriPrefix, {});
    }

    render() {
        return (
            <div>
                <div className={styles['DataTable__datatable-container']}>
                    <MuiThemeProvider theme={getMuiTheme(this.state.isFetching, createMuiTheme)}>
                        <MUIDataTable
                            data={this.props.tableData}
                            columns={this.props.tableColumns}
                            options={this.props.tableOptions}
                        />
                    </MuiThemeProvider>
                </div>
                
				
				
				
            </div>
        );
    }
}
// <div className={styles['DataTable__pagination-container']}>
//                     <div className={styles['DataTable__pagination-sub-container']}>
//                         <Pagination
//                             hideFirstLastPages
//                             // 페이지네이션 노출 번호 수 [1, 2, 3 ... 10]
//                             pageRangeDisplayed={this.tablePaginationRange}
//                             // 활성 페이지 번호
//                             activePage={this.state.pagination.activePage}
//                             // 각 페이지의 아이템 수
//                             itemsCountPerPage={this.tablePaginationOffset}
//                             // 전체 아이템 수
//                             totalItemsCount={this.state.pagination.totalItemsCount}
//                             onChange={this.onPaginationChange}
//                             prevPageText="«"
//                             nextPageText="»"
//                             linkClassPrev="page-link"
//                             linkClassNext="page-link"
//                             itemClass="page-item"
//                             linkClass="page-link"
//                         />
//                     </div>
//                 </div>

DataTable.propTypes = {
    // tableDataApiUri: PropTypes.string.isRequired,
    // paginationCntApiUri: PropTypes.string.isRequired,
    tableColumns: PropTypes.array.isRequired,
    tableOptions: PropTypes.object.isRequired,
};

export default DataTable;
