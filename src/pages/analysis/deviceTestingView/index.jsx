// Utility Components
import React, { Component } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import has from 'has';
import axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'querystring';

// User-define Components
import pageStyles from '../../../Page.scss';
import styles from './style.scss';
import { timeFormatter, getFullUri, getFullUriNotStringify } from '../../../Page';

import ToolBar from '../../../components/common/ToolBar';
import Icon from '../../../components/icons';

// Open-source Components
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import Chart from 'react-google-charts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { compose, withProps } from 'recompose';

// Define const

class DeviceTestingView extends Component {
    constructor(props) {
        super(props);
        
        this.commonChartOps = {
            height: '500px',
            chartType: 'LineChart',
        }
        
        this.complimentaryChartOps = {
            title : 'Complimentary filter',
            hAxisTitle: 'Time',
            vAxisTitle: 'Amount',
            vMaxVal: 200,
            vMinVal: -200,
            dataOps: [ { type: 'datetime' }, 'Angle Vector'],
        };
        
        this.rolloverChartOps = {
            title : 'Rollover',
            hAxisTitle: 'Time',
            vAxisTitle: 'Amount',
            vMaxVal: 90,
            vMinVal: -90,
            dataOps: [ { type: 'datetime' }, 'Angle X'],
        };
        
        this.accelChartOps = {
            title : 'Accel',
            hAxisTitle: 'Time',
            vAxisTitle: 'Amount',
            vMaxVal: 50,
            vMinVal : -50,
            dataOps: [ { type: 'datetime' }, 'Accel vector'],
        };
        
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 1)
        
        this.state = {
            complimentaryData: [],
            rolloverData: [],
            accelData: [],
            startDate: new Date(),
            endDate: endDate,
        };
        
        this.apiUri = {
            deviceTest : '/devicetest',
        };
        
        this.setChartData(this, this.state.startDate, this.state.endDate);
        
        this.startDateChangePicker = this.startDateChangePicker.bind(this);
        this.endDateChangePicker = this.endDateChangePicker.bind(this);
    }
    
    async setChartData(self, startDate, endDate) {
        console.log("Update chartData!");
        
        let queryObj = {
            occured_date : JSON.stringify({$gte : timeFormatter(startDate), $lt : timeFormatter(endDate)}),
            sort: "occured_date",
            order: 1,
        };
        
        console.log("queryObj", queryObj);
        
        // queryObj.occured_date = queryString.stringify(queryObj.occured_date);
        
        await axios.get(getFullUri(self.apiUri.deviceTest, queryObj))
            .then((res) => {
                let complimentResultArr = [];
                complimentResultArr.push(self.complimentaryChartOps.dataOps);
                let rolloverResultArr = [];
                rolloverResultArr.push(self.rolloverChartOps.dataOps);
                let accelResultArr = [];
                accelResultArr.push(self.accelChartOps.dataOps)
                
                const capsuleData = (date, data, dataName) => {
                    return [date, data[dataName]];  
                };
                
                for (var i = 0; i < res.data.length; i++ ) {
                    let occured_date = new Date(res.data[i]['occured_date']);
                    occured_date = new Date(occured_date.getYear(), occured_date.getMonth(), occured_date.getDate(), occured_date.getHours(), occured_date.getMinutes(), occured_date.getSeconds());
                    
                    const complimentaryData = capsuleData(occured_date, res.data[i], 'complimentary');
                    complimentResultArr.push(complimentaryData);
                    
                    const rolloverData = capsuleData(occured_date, res.data[i], 'roll');
                    rolloverResultArr.push(rolloverData);
                    
                    const accelData = capsuleData(occured_date, res.data[i], 'accel');
                    accelResultArr.push(accelData);
                }
                
                self.setState(prevState => ({
                    ...prevState,
                    complimentaryData : complimentResultArr,
                    rolloverData : rolloverResultArr,
                    accelData : accelResultArr,
                }));
            });
    }
    
    componentDidMount() {
        // setInterval(() => {
        //     this.setChartData(this, this.state.startDate, this.state.endDate);
        // }, 2000);
    }
    
    componentWillUnmount() {
        clearInterval(this.setChartData);
    }
    
    startDateChangePicker(date) {
        this.setState(prevState => ({
            ...prevState,
            startDate : date,
        }));
        
        this.setChartData(this, date, this.state.endDate);
    }
    
    endDateChangePicker(date) {
        this.setState(prevState => ({
            ...prevState,
            endDate : date,
        }));
        
        this.setChartData(this, this.state.startDate, date);
    }
    
    render() {
        return (

            <div>
                <ToolBar
                    title={this.props.pageTitle}
                />
                <section className={pageStyles['Page__content']}>
                    <div className={pageStyles['Page__content-top']}>
                        <DatePicker
                            selectsStart
                            showTimeSelect
                            dateFormat="yyyy/MM/dd HH:mm"
                            timeFormat="HH:mm"
                            selected={this.state.startDate}
                            onChange={this.startDateChangePicker}
                            maxDate={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            timeIntervals={1}
                        />
                        &nbsp;~&nbsp;
                        <DatePicker
                            selectsEnd
                            showTimeSelect
                            dateFormat="yyyy/MM/dd HH:mm"
                            timeFormat="HH:mm"
                            selected={this.state.endDate}
                            onChange={this.endDateChangePicker}
                            minDate={this.state.startDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            timeIntervals={1}
                        />
                    </div>
                    <div>
                        <Chart
                            height={this.commonChartOps.height}
                            chartType={this.commonChartOps.chartType}
                            loader={<div>Loading Chart</div>}
                            data={this.state.complimentaryData}
                            options={{
                                title: this.complimentaryChartOps.title,
                                hAxis: {
                                    title: this.complimentaryChartOps.hAxisTitle,
                                    gridlines: {count: this.complimentaryChartOps.grildLinesCnt},
                                },
                                vAxis: {
                                    title: this.complimentaryChartOps.vAxisTitle,
                                    maxValue:this.complimentaryChartOps.vMaxVal,
                                    minValue:this.complimentaryChartOps.vMinVal,
                                },
                                series: {
                                    0: { 
                                        curveType: 'function',
                                    },
                                },
                                legend: {position: 'bottom'}
                            }}
                        />  
                    </div>
                    
                    <div className={styles['Chart-divide']}></div>
                    
                    <div>
                        <Chart
                            height={this.commonChartOps.height}
                            chartType={this.commonChartOps.chartType}
                            loader={<div>Loading Chart</div>}
                            data={this.state.accelData}
                            options={{
                                title: this.accelChartOps.title,
                                hAxis: {
                                    title: this.accelChartOps.hAxisTitle,
                                    gridlines: {count: this.accelChartOps.grildLinesCnt},
                                },
                                vAxis: {
                                    title: this.accelChartOps.vAxisTitle,
                                    maxValue:this.accelChartOps.vMaxVal,
                                    minValue:this.accelChartOps.vMinVal,
                                },
                                series: {
                                    0: { 
                                        curveType: 'function',
                                    },
                                },
                                legend: {position: 'bottom'}
                            }}
                        />  
                    </div>
                    
                    <div className={styles['Chart-divide']}></div>
                    
                    <div>
                        <Chart
                            height={this.commonChartOps.height}
                            chartType={this.commonChartOps.chartType}
                            loader={<div>Loading Chart</div>}
                            data={this.state.rolloverData}
                            options={{
                                title: this.rolloverChartOps.title,
                                hAxis: {
                                    title: this.rolloverChartOps.hAxisTitle,
                                    gridlines: {count: this.rolloverChartOps.grildLinesCnt},
                                },
                                vAxis: {
                                    title: this.rolloverChartOps.vAxisTitle,
                                    maxValue:this.rolloverChartOps.vMaxVal,
                                    minValue:this.rolloverChartOps.vMinVal,
                                },
                                series: {
                                    0: { 
                                        curveType: 'function',
                                    },
                                },
                                legend: {position: 'bottom'}
                            }}
                        />  
                    </div>
                    
                </section>
                
            </div>
        );
    }
}

DeviceTestingView.defaultProps = {
    pageTitle: 'no title',
};

DeviceTestingView.propTypes = {
    pageTitle: PropTypes.string,
};

export default DeviceTestingView;
