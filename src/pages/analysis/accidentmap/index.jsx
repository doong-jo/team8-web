// Utility Components
import React, { Component } from 'react';
import { Button, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
// import has from 'has';
import axios from 'axios';
import PropTypes from 'prop-types';
import { throttle, debounce } from 'throttle-debounce';
// import queryString from 'querystring';
const has = require("has");
import format from 'date-fns/format';
import autosuggest from 'react-autosuggest';
// User-define Components
import SelectBox from '../../components/SelectBox';
// import SearchInput from '../../components/SearchInput';
import pageStyles from '../../../Page.scss';
import styles from './style.scss';
import { timeFormatter, getFullUri } from '../../../Page';

import ToolBar from '../../../components/common/ToolBar';
import Icon from '../../../components/icons';
import { ConfirmModal } from '../../../pages/components/modal/Modal';
import TablePagination from '../../components/TablePagination';

// Open-source Components
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import DatePicker from "react-datepicker";
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    StreetViewPanorama,
    OverlayView,
} = require('react-google-maps');
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyA2frTy4tc-UaInRtQYs3rTZO5QdH3js0k");
Geocode.enableDebug();

import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import Chart from 'react-google-charts';
import { compose, withProps } from 'recompose';

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
})

const MapWithMarker = withScriptjs(withGoogleMap(props => {
    // const baseURL = 
    console.log('MapWithMarker props >>>', props);
    const markerImage = (hasAlerted, type) => {
        return {
            url: hasAlerted ? "http://175.123.140.145:88/images/danger_" + type + ".png" : "http://175.123.140.145:88/images/warning_" + type + ".png",
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(16, 32)
        };
    };
    
    return (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={15}
            defaultCenter={props.center}
            center={props.center}
            onBoundsChanged={props.onBoundsChanged}
            // onDragEnd={props.onDragEnd}
            // onZoomChanged={props.onZoomChanged}
        >
            <StreetViewPanorama 
                defaultPosition={props.center} 
                position={{ lat: props.streetViewLat, lng: props.streetViewLong }} 
                visible={props.streetViewVisible}
                onVisibleChanged={props.streetViewVisibleChanged}>
            </StreetViewPanorama>
            {
                props.markerList.map(object => (
                    <Marker
                        key={object.key}
                        position={object.position}
                        icon={markerImage(object.hasAlerted, object.ridingType)}
                        animation={google.maps.Animation.DROP}
                        onClick={() => {props.modalOpenTrigger(
                            {
                                content:
                                    "발생시간 : " + object.date + "\n" +
                                    "유저인덱스 : " + object.userId + "\n" +
                                    "주행타입 : " + object.ridingType + "\n" +
                                    "사고알림여부 : " + object.hasAlerted + "\n" +
                                    "가속도 : " + object.accel + "\n" +
                                    "기울기 : " + object.rollover + "\n",
                                type: object.hasAlerted ? "danger" : "warning",
                                position: object.position,
                                realAddress: object.realAddress,
                            })}}
                    >
                    </Marker>
                ))
                
            }
            <MarkerWithLabel
                position={props.center}
                labelAnchor={new google.maps.Point(32, 55)}
                labelStyle={{fontSize: "8px"}}
            >
                <div><b>Current position</b></div>
            </MarkerWithLabel>
                
        </GoogleMap>
    );
}));

const MapWithCircle = withScriptjs(withGoogleMap(props => {
    console.log('MapWithCircle props >>>', props);
    const warningHeatmapOptions = {
        'gradient': [
            'rgba(108, 255, 15, 0)',
            'rgba(122, 243, 17, 1)',
            'rgba(137, 232, 20, 1)',
            'rgba(152, 220, 22, 1)',
            'rgba(166, 209, 25, 1)',
            'rgba(181, 198, 28, 1)'
        ],
    };
    
    const dangerHeatmapOptions = {
        'gradient': [
            'rgba(255, 141, 41, 0)',
            'rgba(255, 141, 41, 1)',
            'rgba(255, 132, 41, 1)',
            'rgba(255, 123, 41, 1)',
            'rgba(255, 114, 41, 1)',
            'rgba(255, 105, 28, 1)',
            'rgba(255, 97, 41, 1)',
            'rgba(255, 88, 41, 1)',
            'rgba(255, 79, 41, 1)',
            'rgba(255, 70, 41, 1)',
            'rgba(255, 61, 41, 1)',
            'rgba(255, 53, 41, 1)'
        ],
    };
    
    const warningMarker = [];
    const dangerMarker = [];
    // console.log('MapWithCircle center >>> ', new google.maps.LatLngBounds().getCenter());
    props.markerList.forEach(object => {
        if( !object.hasAlerted ) {
            warningMarker.push(new google.maps.LatLng(object.position.lat, object.position.lng))
        } else {
            dangerMarker.push(new google.maps.LatLng(object.position.lat, object.position.lng))
        }
    });
    // let ref;
    console.log("dangerMarker length : ", dangerMarker.length);
    // if(props.tabName === 'Heat') {
    // ref = props.onMapMounted
    // }
    return (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={15}
            defaultCenter={props.center}
            center={props.center} // props.center
            onBoundsChanged={props.onBoundsChanged}
        >
            <Marker
                position={props.center}
            />
            
            { warningMarker.length !== 0 && 
                <HeatmapLayer
                    data={warningMarker}
                    options={warningHeatmapOptions}
                />
            }
            
            { dangerMarker.length !== 0 &&
                <HeatmapLayer
                    data={dangerMarker}
                    options={dangerHeatmapOptions}
                />
            }
        </GoogleMap>
    );
}));

class AccidentMap extends Component {
    
    constructor(props) {
        super(props);
        
        const constants = {
            DEFAULT_LAT: 37.5634236,
            DEFAULT_LONG : 126.9918384,
            NAME_MARKER_TAB : "Marker",
            NAME_CIRCLE_TAB : "Heat",
            GOOGLE_MAP_URL : "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2frTy4tc-UaInRtQYs3rTZO5QdH3js0k&v=3.exp&libraries=geometry,places,visualization",
            DANGER_ICON : <Icon size="84px" color="#D40404" iconId="exclamation-triangle" />,
            WARNING_ICON : <Icon size="84px" color="#FCCC04" iconId="exclamation-triangle" />,
            TABLE_COLUMS : [
                {
                    title: 'Location',
                    dataIndex: 'location',
                    key: 'location',
                    width: '70%',
                },
                {
                    title: 'Accidents_Count',
                    dataIndex: 'accidentsCount',
                    key: 'accidentsCount',
                    width: '30%',
                },
            ],
            PAGE_COUNT: 5,
            PAGE_SIZE: 5,
            PIE_OPTIONS: {
                title: 'Accident Rate by Region',
                titleTextStyle: {
                    bold: true,
                    fontSize: 14,
                    position: 'center',
                },
                backgroundColor: '#F1F3F6',
                // is3D: true,
                sliceVisibilityThreshold: 0.01,
                legend: {
                    position: 'right',
                    alignment: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                },
                chartArea: {
                    width: '100%',
                    height: '80%'
                },
            },
            PIE_MAX_LIMIT: 9,
            PIE_SELECT_EVENT:[
                {
                    eventName : 'select',
                    callback  : ({chartWrapper}) => { 
                        this.onChartSelectHandler(chartWrapper);
                    }
                }
            ],
            PIE_REGION: ['country', 'sido', 'sigungu', 'dong', 'ubmyun', 'ri', 'bunji'],
            LINE_CHART_WEEK: "week",
            LINE_CHART_MONTH: "month",
            LINE_CHART_YEAR: "year",
            LINE_OPTIONS: {
                series: {
                    0: {
                        axis: 'Frequency',
                        color: 'green',
                        curveType: 'function',
                        
                    },
                },
                axes: {
                    y: {
                        Frequency: {
                            label: 'frequency',
                        },
                    },
                },
            },
            SELECTBOX_RIDING_TYPE_OPTIONS: [
                { value: 'all', label: 'All'},
                { value: 'bicycle', label: 'Bicycle' },
                { value: 'motorcycle', label: 'Motorcycle' },
                { value: 'smart_mobility', label: 'Smart_Mobility'},
            ],
            SELECTBOX_PERIOD_OPTIONS: [
                { value: 'week', label: 'Within 7days'},
                { value: 'month', label: 'Within a month'},
                { value: 'year', label: 'Within an year'},
            ],
        };
        
        this.CONST = constants;
        
        
        this.googleMap = {};
    
        let endDate = new Date();
        
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        
        this.isNotInit = false;
        
        this.state = {
            activeTab: this.CONST.NAME_MARKER_TAB,
            
            curGoogleMapPos: {
                lat: this.CONST.DEFAULT_LAT,
                lng: this.CONST.DEFAULT_LONG,
            },
            
            streetViewPos: {
                lat: this.CONST.DEFAULT_LAT,
                lng: this.CONST.DEFAULT_LONG,
            },
            
            streetViewVisible: false,
            
            selectPeriod: "week",
            lineData: [
                [{type: 'date', label: 'period'},'frequency count',],
            ],
            onMapWithMarkerMounted: ref => {
                this.googleMap.Marker = ref;
            },
            onMapWithCircleMounted: ref => {
                this.googleMap.Heat = ref;
            },
            mapPosition:{},
            mapBounds:{},
            startDate,
            endDate,
            
            accidentData: [],
            accidentFilterData: [],
            accidentTableData: [],
            currentTableData: [],
            chartData: [],
            regionData: {},
            currentRegion: ["대한민국"],
            selectRidingType: "all",
            
            accidentModalOpen: false,
            accidentUserDataStr: "",
            
            totalPageCount: 0,
            currentPage: 0,
            startPage: 0,
            endPage: 0,
        };

        this.apiUri = {
            accident: '/accident',
            accidentChart: '/accident/accidentchart',
        };
        
        
        // this.loadAccidentData(this, this.state.startDate, this.state.endDate);
        this.loadLineChartData(this, this.state.endDate);
        this.loadChartData(this, this.state.startDate, this.state.endDate);
        this.setCurLocation = this.setCurLocation.bind(this);
        this.setCurLocation();
        
        /* Events */
        this.onStreetViewVisibleChanged = this.onStreetViewVisibleChanged.bind(this);
        this.onStartDateChangePicker = this.onStartDateChangePicker.bind(this);
        this.onEndDateChangePicker = this.onEndDateChangePicker.bind(this);
        this.onAccidentModalTrigger = this.onAccidentModalTrigger.bind(this);
        this.onAccidentAcceptBtnClicked = this.onAccidentAcceptBtnClicked.bind(this);
    }
    
    setFilteredData() {
        
        let accidentDataArr = [];
        if(this.googleMap[this.state.activeTab] !== undefined){
            const bounds = this.googleMap[this.state.activeTab].getBounds();
            const curBounds = {
                lngLeft: bounds.ga.j,
                lngRight: bounds.ga.l,
                latLeft: bounds.ma.j,
                latRight: bounds.ma.l,
            };
            accidentDataArr = this.state.accidentData.filter(accident => {
                return (curBounds.lngLeft < accident.position.lng && accident.position.lng < curBounds.lngRight) &&
                (curBounds.latLeft < accident.position.lat && accident.position.lat < curBounds.latRight);
            });
        }
        
        this.setState(prevState => ({
            ...prevState,
            accidentFilterData: accidentDataArr,
        }),() => {
            if(!this.isNotInit){
                this.isNotInit = true;
            }});
    }
    
    tabToggle(tab) {
        if (this.state.activeTab !== tab) {
            this.googleMap[tab].panTo({lat: this.googleMap[this.state.activeTab].getCenter().lat(), lng: this.googleMap[this.state.activeTab].getCenter().lng()});
            
            this.setState({
                activeTab: tab,
            });
        }
    }

    onStreetViewVisibleChanged() {
        console.log('called onStreetViewVisibleChanged! ');

        this.setState(prevState => ({
            ...prevState,
            streetViewVisible: !prevState.streetViewVisible,
        }));
    }
    
    onStartDateChangePicker(date) {
        this.setState(prevState => ({
            ...prevState,
            startDate : date,
        }), () => {
            this.loadAccidentData(this, date, this.state.endDate);
            this.loadChartData(this, date, this.state.endDate);
        });
    }
    
    onEndDateChangePicker(date) {
        this.setState(prevState => ({
            ...prevState,
            endDate : date,
        }), () => {
            this.loadAccidentData(this, this.state.startDate, date);
            this.loadChartData(this, this.state.startDate, date);        
        });
    }
    
    
    onAccidentModalTrigger(data) {
        console.log('trigger >>> ', data);
        if( !has(data, "content") ) {
            this.setState(prevState => ({
                ...prevState,
                accidentModalOpen: !prevState.accidentModalOpen,
            }));
        }
        else {
            this.setState(prevState => ({
                ...prevState,
                accidentModalOpen: !prevState.accidentModalOpen,
                accidentUserDataStr:  data.content + "Address : " + data.realAddress,
                accidentType: data.type === "danger" ? this.CONST.DANGER_ICON : this.CONST.WARNING_ICON,
                streetViewPos: data.position,
            }));
        }
    }
    
    onAccidentAcceptBtnClicked() {
        console.log('called onAccidentAcceptBtnClicked!');
        
        this.setState(prevState => ({
            ...prevState,
            accidentModalOpen: !prevState.accidentModalOpen,
            streetViewVisible: true,
        }));
    }
    
    // async onRowTableClicked(record,index,event){
    //     this.onAccidentModalTrigger({ content:
    //                             "발생시간 : " + record.date + "\n" +
    //                             "유저인덱스 : " + record.userId + "\n" +
    //                             "주행타입 : " + record.ridingType + "\n" +
    //                             "사고알림여부 : " + record.hasAlerted + "\n" +
    //                             "가속도 : " + record.accel + "\n" +
    //                             "기울기 : " + record.rollover + "\n",
    //     type: record.hasAlerted ? "danger" : "warning",
    //     position: record.realAddress,
    //     });
    // }

    onSelectBoxRidingTypeHandler(ridingType) {
        this.setState(prevState => ({
            ...prevState,
            selectRidingType : ridingType,
        }),() => {
            this.loadAccidentData(this, this.state.startDate, this.state.endDate);
            this.loadChartData(this, this.state.startDate, this.state.endDate);
            this.loadLineChartData(this, this.state.endDate);
        });
    }
    
    onSelectBoxLineChartHandler(period) {
        this.setState(prevState => ({
            ...prevState,
            selectPeriod : period,
        }),() => {
            this.loadLineChartData(this, this.state.endDate);
        });
    }
    
    onChartSelectHandler(chartWrapper) {
        let chartIndex = chartWrapper.getChart().getSelection()[0].row,
            chartRegion = JSON.parse(chartWrapper.toJSON())['dataTable']['rows'][chartIndex]['c'][0]['v'];
        
        this.setState(prevState => ({
            ...prevState,
            currentRegion: [...this.state.currentRegion, chartRegion],
        }), () => {this.loadChartData(this, this.state.startDate, this.state.endDate);});
    }
    
    async onClickChartRegion(e) {
        e.preventDefault();
        if(this.state.currentRegion.length > 1){
            this.setState(prevState => ({
                ...prevState,
                currentRegion: this.state.currentRegion.slice(0,this.state.currentRegion.length-1),
            }), () => {this.loadChartData(this, this.state.startDate, this.state.endDate);});
        }
    }

    setCurLocation() {
        console.log("called setCurLocation!");

        if (navigator.geolocation) {
            console.log("is geolocation!");
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                console.log("get position :", pos);
                this.setState(prevState => ({
                    ...prevState,
                    curGoogleMapPos: pos,
                }), () => {this.loadAccidentData(this, this.state.startDate, this.state.endDate);});

                return pos;
            }, (error) => {
                console.log("handleLocationError Geolocation: ", error);
                // handleLocationError(true, infoWindow, map.getCenter());
            });
        }
        else {
            console.log("Browser doesn't support Geolocation");
            // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    
    async loadLineChartData(self, endDate) {
        let lineChartData = [[{type: 'date', label: 'period'},'frequency count',]],
            lineChartDic = {},
            lineStartDate = new Date();

        if(this.state.selectPeriod == 'week') {
            lineStartDate.setDate(endDate.getDate()-7);
        }else if(this.state.selectPeriod == 'month') {
            lineStartDate.setMonth(endDate.getMonth()-1);
        }else {
            lineStartDate.setYear(endDate.getFullYear()-1);
        }
    
        lineStartDate.setHours(0, 0, 0, 0);
        
        const queryObj = {
            occured_date : JSON.stringify({$gte : timeFormatter(lineStartDate), $lt : timeFormatter(endDate)}),
            sort: "occured_date",
            order: 1,
            riding_type: this.state.selectRidingType,
        };
        
        const setLineChartDic = (period) => {
            const year = endDate.getFullYear(),
                month = endDate.getMonth(),
                day = endDate.getDate();
            
            if(period == this.CONST.LINE_CHART_WEEK) {
                for(let i=0 ; i<=7 ; i++) {
                    lineChartDic[new Date(year, month, day-7+i)] = 0;
                }
            }else if(period == this.CONST.LINE_CHART_MONTH) {
                for(let i=0 ; i<=30 ; i++) {
                    lineChartDic[new Date(year, month, day-30+i)] = 0;
                }
            }else if(period == this.CONST.LINE_CHART_YEAR) {
                for(let i=0 ; i<=12 ; i++) {
                    lineChartDic[new Date(year, (month-12+i))] = 0;
                }
            }
        };
                
        setLineChartDic(this.state.selectPeriod);
        
        await axios.get(getFullUri(self.apiUri.accident, queryObj))
            .then((res) => {

                let accidentDataLength = res.data.length;
                    
                const setInitPage = () => {
                    self.setState(prevState => ({
                        ...prevState,
                        lineData: lineChartData, 
                    }));
                };
                const dicToArray = (dic, callback) => {
                    for(let key in dic){
                        lineChartData.push([new Date(key), dic[key]]);    
                    }
                    
                    lineChartData.sort((data1, data2) => {
                        return data2[0]-data1[0];
                    });
                    callback();
                };
                
                if(res.data.length == 0){
                    dicToArray(lineChartDic, setInitPage);
                }
                res.data.forEach((accident, i) => { 
                    let accidentDate = new Date(accident.occured_date);

                    if(accidentDate >= lineStartDate && accidentDate <= this.state.endDate){
                        accidentDate.setHours(0, 0, 0, 0); 
                        if(lineChartDic[accidentDate] == undefined){
                            lineChartDic[accidentDate] = 0;
                        }
                        
                        lineChartDic[accidentDate]++;
                    }

                    if(i+1 == accidentDataLength){
                        dicToArray(lineChartDic, setInitPage);
                    }
                });
            });
    }
    
    async loadChartData(self, startDate, endDate) {
        let queryObjForChart = {
            type: this.CONST.PIE_REGION[this.state.currentRegion.length],
            parent: this.state.currentRegion[this.state.currentRegion.length-1],
            occured_dates: JSON.stringify({$gte : timeFormatter(startDate), $lt : timeFormatter(endDate)}),
            riding_type: this.state.selectRidingType,
            // order: 1,
        };
        
        await axios.get(getFullUri(self.apiUri.accidentChart, queryObjForChart))
            .then((res) => {
                const resData = res.data;
                let chartDataArr = [['Task', 'Accident Rate by Region']],
                    accidentTableDataArr = [],
                    totalPageNum = 0,
                    arrayEndIndex = 0;

                const setInitPage = () => {
                    self.setState(prevState => ({
                        ...prevState,
                        startPage: 0,
                        endPage: self.CONST.PAGE_COUNT < totalPageNum ? self.CONST.PAGE_COUNT-1 : Math.max(0,totalPageNum-1),
                        currentPage: 0,
                        totalPageCount: totalPageNum,
                        accidentTableData: accidentTableDataArr,
                        currentTableData: accidentTableDataArr.slice(0, arrayEndIndex),
                        chartData: chartDataArr,
                    }));
                };
                const pushChartData = () => {
                    resData.forEach((value, index) => {
                        chartDataArr.push([value.name, value.occured_dates.length]);
                        accidentTableDataArr.push({
                            location: this.state.currentRegion.join(' ') + ' '+ value.name,
                            accidentsCount: value.occured_dates.length,
                            key: value.name,
                        });
                    });
    
                    const tableDataLength = accidentTableDataArr.length;
                    totalPageNum = Math.ceil(tableDataLength / this.CONST.PAGE_SIZE);
                    arrayEndIndex = tableDataLength < this.CONST.PAGE_SIZE ? tableDataLength : this.CONST.PAGE_SIZE;
                    
                    accidentTableDataArr.sort((data1, data2) => {
                        return data2['accidentsCount']-data1['accidentsCount'];
                    });

                    setInitPage();
                };
                
                pushChartData();
            });
    }
    
    async loadAccidentData(self, startDate, endDate) {
        console.log("Update accidentData!");
        
        let queryObj = {
            occured_date : JSON.stringify({$gte : timeFormatter(startDate), $lt : timeFormatter(endDate)}),
            sort: "occured_date",
            order: 1,
            riding_type: this.state.selectRidingType,
            // limit: 10,
        };
        
        console.log("queryObj", queryObj);

        await axios.get(getFullUri(self.apiUri.accident, queryObj))
            .then((res) => {
                
                let accidentArr = [],
                    accidentDataLength = res.data.length;

                const setInitPage = () => {
                    self.setState(prevState => ({
                        ...prevState,
                        accidentData: accidentArr,
                    }),() => {
                        this.setFilteredData();
                    });
                };
                if(res.data.length == 0) {
                    setInitPage();
                }
                res.data.forEach((accident, i) => { 
                    const position = {
                        lat: accident.position.latitude,
                        lng: accident.position.longitude,
                    };
                    
                    accidentArr.push({
                        key: i,
                        ridingType: accident.riding_type,
                        hasAlerted: accident.has_alerted+'' != undefined ? accident.has_alerted+'' : '',
                        position: position,
                        userId: accident.user_id,
                        accel: accident.accel,
                        rollover: accident.rollover,
                        date: format(accident.occured_date,'YYYY-MM-DD HH:mm:SSS'),
                        realAddress: accident.realAddress,
                    });

                    if(accidentArr.length == accidentDataLength){
                        accidentArr.sort((data1,data2) => {
                            return data1.key-data2.key;
                        });

                        setInitPage();
                    }
                    // });
                });
                // }
            });
    }
    
    getAccidentTableList(index) {//get AccidentTableList from db
        const accidentDataLength = this.state.accidentTableData.length;
        const arrayEndIndex = accidentDataLength < (index+1)*this.CONST.PAGE_SIZE ? accidentDataLength: (index+1)*this.CONST.PAGE_SIZE;

        const setCurrentPage = (startPage, endPage) => {
            this.setState(prevState => ({
                ...prevState,
                startPage : startPage !== undefined ? startPage : this.state.startPage,
                endPage : endPage !== undefined ? endPage : this.state.endPage,
                currentTableData: this.state.accidentTableData.slice(index*this.CONST.PAGE_SIZE, arrayEndIndex),
                currentPage: index,
            }));
        }
        
        if(index > this.state.endPage){
            if(index+this.CONST.PAGE_COUNT <= this.state.totalPageCount){
                setCurrentPage(index, index+this.CONST.PAGE_COUNT-1);
            }else{
                setCurrentPage(index, this.state.totalPageCount-1);
            }
        }else if(index < this.state.startPage){
            setCurrentPage(this.state.startPage-this.CONST.PAGE_COUNT, parseInt(index / this.CONST.PAGE_COUNT)+this.CONST.PAGE_COUNT-1);
        }else{
            setCurrentPage();
        }
    }
    
    render() {
        // in -> <div className={pageStyles['Page__content-top']}>
        // <Button color="primary" onClick={this.onCreateMdTrigger}>새 배너 생성</Button>
        let currentRegionSlice = '',
            endRegion = '';
        
        if(this.state.currentRegion.length == 1){
            if(this.state.chartData.length > 1)
                currentRegionSlice = this.state.currentRegion[0];
        }
        else {
            const tempStr = this.state.currentRegion.join('>>');
            currentRegionSlice = tempStr.substring(0,tempStr.lastIndexOf('>')+1);
            endRegion = this.state.currentRegion[this.state.currentRegion.length-1];
        }

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
                            onChange={this.onStartDateChangePicker}
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
                            onChange={this.onEndDateChangePicker}
                            minDate={this.state.startDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            timeIntervals={1}
                        />
                        <SelectBox
                            className={styles.AccidentMap__selectBox__ridingType}
                            options={this.CONST.SELECTBOX_RIDING_TYPE_OPTIONS}
                            defaultValue={this.CONST.SELECTBOX_RIDING_TYPE_OPTIONS[0]}
                            changeHandler={(data) => {
                                this.onSelectBoxRidingTypeHandler(data.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.AccidentMap__chartTableDiv}>
                        <div className={styles.AccidentMap__chart__div}>
                            <Chart
                                width={'500px'}
                                height={'400px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.chartData}
                                options={this.CONST.PIE_OPTIONS}
                                legend_toggle
                                chartEvents={this.CONST.PIE_SELECT_EVENT}
                            />
                            <div className={styles.AccidentMap__chart__regionDiv}>
                                {currentRegionSlice}
                                <a
                                    style={{ 'textDecoration': 'none' }}
                                    onClick={e => this.onClickChartRegion(e)}
                                    href="#">{endRegion}</a>
                            </div>
                        </div>
                        <div className={styles.AccidentMap__dataTable__div}>
                            <Table
                                className={styles.AccidentMap__dataTable}
                                columns={this.CONST.TABLE_COLUMS}
                                data={this.state.currentTableData}
                                // onRow={(record,index) => ({
                                //     onClick: this.onRowTableClicked.bind(this,record,index),
                                //     onDoubleClick: this.onRowTableClicked.bind(this, record, index),
                                // })} 
                            />
                            <TablePagination
                                className={styles.AccidentMap__tablePagination}
                                startPage={this.state.startPage}
                                endPage={this.state.endPage}
                                currentPage={this.state.currentPage}
                                totalPageCount={this.state.totalPageCount}
                                pageOnClick= {(index) => {
                                    this.getAccidentTableList(index);
                                }}
                            />
                        </div>
                    </div>
                    <SelectBox
                        className={styles.AccidentMap__selectBox__lineChart}
                        options={this.CONST.SELECTBOX_PERIOD_OPTIONS}
                        defaultValue={this.CONST.SELECTBOX_PERIOD_OPTIONS[0]}
                        changeHandler={(data) => {
                            this.onSelectBoxLineChartHandler(data.target.value);
                        }}
                    />
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="Line"
                        loader={<div>Loading Chart</div>}
                        data={this.state.lineData}
                        options={this.CONST.LINE_OPTIONS}
                    />

                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === this.CONST.NAME_MARKER_TAB })}
                                onClick={() => { this.tabToggle(this.CONST.NAME_MARKER_TAB); }}
                            >
                                {this.CONST.NAME_MARKER_TAB}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === this.CONST.NAME_CIRCLE_TAB })}
                                onClick={() => { this.tabToggle(this.CONST.NAME_CIRCLE_TAB); }}
                            >
                                {this.CONST.NAME_CIRCLE_TAB}
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={this.CONST.NAME_MARKER_TAB}>
                            <Row>
                                <Col sm="12">
                                    <div>
                                        <div className={styles.AccidentMap__googleMap}>
                                            <MapWithMarker
                                                googleMapURL={this.CONST.GOOGLE_MAP_URL}
                                                onMapMounted={this.state.onMapWithMarkerMounted}
                                                onBoundsChanged={
                                                    debounce(300, false, () => {
                                                        console.log('debounce...');
                                                        if(this.isNotInit) {
                                                            this.setFilteredData();
                                                        }
                                                    })
                                                }
                                                loadingElement={<div style={{ height: '100%' }} />}
                                                containerElement={<div style={{ height: '700px' }} />}
                                                mapElement={<div style={{ height: '100%' }} />}
                                                center={this.state.curGoogleMapPos}
                                                markerList={this.state.accidentFilterData}
                                                modalOpenTrigger={this.onAccidentModalTrigger}
                                                streetViewVisible={this.state.streetViewVisible}
                                                streetViewVisibleChanged={this.onStreetViewVisibleChanged}
                                                streetViewLat={this.state.streetViewPos.lat}
                                                streetViewLong={this.state.streetViewPos.lng}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId={this.CONST.NAME_CIRCLE_TAB}>
                            <Row>
                                <Col sm="12">
                                    <div>
                                        <div className={styles.AccidentMap__googleMap}>
                                            <MapWithCircle
                                                onMapMounted={this.state.onMapWithCircleMounted}
                                                onBoundsChanged={
                                                    debounce(300, false, () => {
                                                        console.log('debounce...');
                                                        if(this.isNotInit) {
                                                            this.setFilteredData();
                                                        }
                                                    })
                                                }
                                                googleMapURL={this.CONST.GOOGLE_MAP_URL}
                                                loadingElement={<div style={{ height: '100%' }} />}
                                                containerElement={<div style={{ height: '700px' }} />}
                                                mapElement={<div style={{ height: '100%' }} />}
                                                center={this.state.curGoogleMapPos}
                                                markerList={this.state.accidentFilterData}
                                                mapPosition={this.state.MapPosition}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </section>
                <ConfirmModal
                    isOpen={this.state.accidentModalOpen}
                    fade={true}
                    backdrop={false}
                    centered
                    size="md"
                    modalHeader="확인"
                    modalBody={<div style={{'textAlign': 'left', whiteSpace: 'pre'}}>{this.state.accidentUserDataStr}</div>}
                    confirmIcon={this.state.accidentType}
                    onClose={this.onAccidentModalTrigger}
                    onAccept={this.onAccidentAcceptBtnClicked}
                    cancelBtn
                    cancelBtnTxt="Cancel"
                    acceptBtnTxt="See Roadview"
                />
            </div>
        );
    }
}

AccidentMap.defaultProps = {
    pageTitle: 'no title',
};

AccidentMap.propTypes = {
    pageTitle: PropTypes.string,
};

export default AccidentMap;
