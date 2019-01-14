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
                        this.onChartSelectHandler(chartWrapper)
                    }
                }
            ],
            PIE_REGION:['country', 'sido', 'sigungu', 'dong', 'ubmyun', 'ri', 'bunji'],
            SELECTBOX_OPTIONS: [
                { value: 'all', label: 'All'},
                { value: 'bicycle', label: 'Bicycle' },
                { value: 'motorcycle', label: 'Motorcycle' },
                { value: 'smart_mobility', label: 'Smart_Mobility'},
            ],
        };
        
        this.CONST = constants;
        
        
        this.googleMap = {};
        // this.googleMarkerMap;
        // this.googleHeatMap;
    
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
            
            // onMapMounted: ref => {
            //     this.googleMap = ref;
            //     // console.log('onMapMounted googleMap', this.googleMap.getBounds());
            // },
            onMapWithMarkerMounted: ref => {
                // this.googleMarkerMap = ref;
                this.googleMap.Marker = ref;
            },
            onMapWithCircleMounted: ref => {
                // this.googleHeatMap = ref;
                this.googleMap.Heat = ref;
            },
            // onZoomChanged: () => {
            //     console.log(this.googleMap.getBounds());
            //     // this.setAccidentData(this.googleMap.getBounds());
            // },
            // onBoundsChanged: () => {
                
            // },
            // onDragEnd: () => {
            //     console.log("onDragEnd", this.googleMap.getCenter());
            //     // this.setAccidentData(this.googleMap.getBounds());
            // },
            // ,
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
            // currentRegionIndex: 0,
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
        this.loadChartData(this, this.state.startDate, this.state.endDate);
        this.setCurLocation = this.setCurLocation.bind(this);
        this.setCurLocation();
        
        /* Events */
        this.onStreetViewVisibleChanged = this.onStreetViewVisibleChanged.bind(this);
        this.onStartDateChangePicker = this.onStartDateChangePicker.bind(this);
        this.onEndDateChangePicker = this.onEndDateChangePicker.bind(this);
        this.onAccidentModalTrigger = this.onAccidentModalTrigger.bind(this);
        this.onAccidentAcceptBtnClicked = this.onAccidentAcceptBtnClicked.bind(this);
        // this.onFilterDataHandler = this.onFilterDataHandler.bind(this)
    }
    
    // onFilterDataHandler() {
    //     // 
    //     // }
    // }
    
    setFilteredData() {
        console.log('bounds change...');
        console.log('activeTab>>>', this.state.activeTab );
        const bounds = this.googleMap[this.state.activeTab].getBounds();
        // const bounds = this.state.activeTab =='Marker' ? this.googleMarkerMap.getBounds() : this.googleHeatMap.getBounds();
        
        const curBounds = {
            lngLeft: bounds.fa.j,
            lngRight: bounds.fa.l,
            latLeft: bounds.ma.j,
            latRight: bounds.ma.l,
        };
        
        // console.log('curBounds>>>', curBounds);
        
        const accidentDataArr = this.state.accidentData.filter(accident => {
            // console.log('accident lng>>>', accident.position.lng, '  accident lat>>>', accident.position.lat);
            return (curBounds.lngLeft < accident.position.lng && accident.position.lng < curBounds.lngRight) &&
            (curBounds.latLeft < accident.position.lat && accident.position.lat < curBounds.latRight);
        });
        
        // this.state.accidentData.filter(accident => {
        //     console.log('accident lng >>>'+ accident.position.lng + 'accident lat' + accident.position.lat);
        //     (curBounds.lngLeft < accident.position.lng < curBounds.lngRight) || (curBounds.latLeft < accident.position.lat < curBounds.latRight);
        // })
        
        console.log('original accidentData length', this.state.accidentData.length);
        console.log('filtered accidentData', accidentDataArr);
        
        this.setState(prevState => ({
            ...prevState,
            accidentFilterData: accidentDataArr,
        }),() => {
            console.log('isNotInit..',this.isNotInit);
            if(!this.isNotInit){
                // this.googleMap = this.googleMarkerMap;
                this.isNotInit = true;
            }});}
    
    tabToggle(tab) {
        if (this.state.activeTab !== tab) {
            // console.log('tab this.googleMap.getCenter() >>> ', this.googleMap.getCenter);
            // console.log('tab this.googleMap.getCenter()>>>', new google.maps.LatLngBounds().getCenter());
            this.googleMap[tab].panTo({lat: this.googleMap[this.state.activeTab].getCenter().lat(), lng: this.googleMap[this.state.activeTab].getCenter().lng()});
            // if(tab == this.CONST.NAME_CIRCLE_TAB) {
            //     this.googleHeatMap.panTo({lat: this.googleMarkerMap.getCenter().lat(), lng: this.googleMarkerMap.getCenter().lng()});
            // }else {
            //     this.googleMarkerMap.panTo({lat: this.googleHeatMap.getCenter().lat(), lng: this.googleHeatMap.getCenter().lng()});
            //     // this.googleMarkerMap.setCenter(this.googleHeatMap.getCenter());
            // }
            
            this.setState({
                activeTab: tab,
                // mapPosition: this.googleMap.getCenter()
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

    onSelectBoxChangeHandler(ridingType) {
        this.setState(prevState => ({
            ...prevState,
            selectRidingType : ridingType,
        }),() => {
            this.loadAccidentData(this, this.state.startDate, this.state.endDate);
            this.loadChartData(this, this.state.startDate, this.state.endDate);
        });
    }
    
    onChartSelectHandler(chartWrapper) {
        let chartIndex = chartWrapper.getChart().getSelection()[0].row,
            chartRegion = JSON.parse(chartWrapper.toJSON())['dataTable']['rows'][chartIndex]['c'][0]['v'];
        console.log('onChartSelectHandelr >>> ', chartRegion);
        
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
            // this.loadAccidentData(this, this.state.startDate, this.state.endDate);
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
                
                // this.isNotGetLocation = true;

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
    
    async loadChartData(self, startDate, endDate) {
        console.log('onChartClick >>> region', this.state.currentRegion);
        let queryObjForChart = {
            // name:
            type: this.CONST.PIE_REGION[this.state.currentRegion.length],
            parent: this.state.currentRegion[this.state.currentRegion.length-1],
            occured_dates: JSON.stringify({$gte : timeFormatter(startDate), $lt : timeFormatter(endDate)}),
            riding_type: this.state.selectRidingType,
            // order: 1,
        };
        
        console.log("queryObjForChart>>>", queryObjForChart);
        
        await axios.get(getFullUri(self.apiUri.accidentChart, queryObjForChart))
            .then((res) => {
                console.log('accidentchart', res.data);
                const resData = res.data;
                let chartDataArr = [['Task', 'Accident Rate by Region']],
                    accidentTableDataArr = [],
                    totalPageNum = 0,
                    arrayEndIndex = 0;

                const setInitPage = () => {
                    // console.log('accidentChart setInitPage chartDataArr', chartDataArr);
                    // console.log('accidentChart setInitPage accidentTableDataArr',accidentTableDataArr);
                    console.log('loadChartData setInitPage...');
                    self.setState(prevState => ({
                        ...prevState,
                        startPage: 0,
                        endPage: self.CONST.PAGE_COUNT < totalPageNum ? self.CONST.PAGE_COUNT-1 : Math.max(0,totalPageNum-1),
                        currentPage: 0,
                        totalPageCount: totalPageNum,
                        accidentTableData: accidentTableDataArr,
                        currentTableData: accidentTableDataArr.slice(0, arrayEndIndex),
                        currentRegion: resData.length === 0 ? [this.state.currentRegion[0]] : this.state.currentRegion,
                        // accidentLocation: accidentLocationDic,
                        chartData: chartDataArr,
                    }));
                };
                
                if(resData.length == 0) {
                    setInitPage();
                }
                
                const pushChartData = () => {
                    resData.forEach((value, index) => {
                        console.log('resData.forEach value', value);
                        console.log('resData.forEach index', index);
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
                    
                    // chartDataArr.sort((data1, data2) => {
                    //     return data2[1]-data1[1];
                    // });
                    
                    accidentTableDataArr.sort((data1, data2) => {
                        return data2['accidentsCount']-data1['accidentsCount'];
                    });
                    console.log('accidentTableDataArr>>>', accidentTableDataArr);
                    console.log('before setInitPage');
                    setInitPage();
                };
                pushChartData(); 
            });
    }
    
    async loadAccidentData(self, startDate, endDate) {
        console.log("Update accidentData!");
        // console.log("this.googlemap >>> ", this.googleMap.getBounds());
        
        let queryObj = {
            occured_date : JSON.stringify({$gte : timeFormatter(startDate), $lt : timeFormatter(endDate)}),
            sort: "occured_date",
            order: 1,
            riding_type: this.state.selectRidingType,
            // limit: 10,
        };
        
        console.log("queryObj", queryObj);
        // const makeAddress = (position,callback) => {
        //     let address = '';
        //     Geocode.fromLatLng(position.lat, position.lng).then(
        //         response => {
        //             address = response.results[0].formatted_address;
        //             console.log('makeAddress position', position);
        //             console.log('makeAddress address', address);
        //             callback(address);
        //         }
        //     );
        // };

        await axios.get(getFullUri(self.apiUri.accident, queryObj))
            .then((res) => {
                
                let accidentArr = [];
                //     accidentTableDataArr = [],
                //     chartDataArr = [['Task', 'Accident Rate by Region']],
                //     // accidentLocationDic = {},
                //     regionDic = {};

                let accidentDataLength = res.data.length;
                //     totalPageNum = 0,
                //     arrayEndIndex = 0;
                console.log('onSelectBoxChange accidentData', res.data );
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
                    
                    // makeAddress(position, address => {
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

                    // const addressArr = address.split(' ');

                    // if(this.state.selectRidingType === 'all' || this.state.selectRidingType === accident.riding_type){
                    //     for(let i=0 ; i < addressArr.length ; i++){
                    //         makeRegionDic(regionDic, addressArr, i);
                    //     }       
                    // }

                    if(accidentArr.length == accidentDataLength){
                        accidentArr.sort((data1,data2) => {
                            return data1.key-data2.key;
                        });
                        
                        // init chartData
                        // if(regionDic.hasOwnProperty(0)){
                        //     for(let locationKey in regionDic[this.state.currentRegion.length][this.state.currentRegion[0]]) {
                        //         chartDataArr.push([locationKey,regionDic[this.state.currentRegion.length][this.state.currentRegion[0]][locationKey]]);
                        //         accidentTableDataArr.push({
                        //             location: this.state.currentRegion.join(' ') + ' '+ locationKey,
                        //             accidentsCount: regionDic[this.state.currentRegion.length][this.state.currentRegion[0]][locationKey],
                        //             key: locationKey 
                        //         });
                        //     }
                            
                        //     const tableDataLength = accidentTableDataArr.length;
                        //     totalPageNum = Math.ceil(tableDataLength / this.CONST.PAGE_SIZE);
                        //     arrayEndIndex = tableDataLength < this.CONST.PAGE_SIZE ? tableDataLength : this.CONST.PAGE_SIZE;
                            
                        //     chartDataArr.sort((data1, data2) => {
                        //         return data2[1]-data1[1];
                        //     });
                            
                        //     accidentTableDataArr.sort((data1, data2) => {
                        //         return data2['accidentsCount']-data1['accidentsCount'];
                        //     });
                        // }

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
    
    // getChartDictoArray(regionArr) {
    //     let chartDataArr = [],
    //         accidentTableDataArr = [],
    //         accidentDataLength = 0,
    //         totalPageNum = 0,
    //         arrayEndIndex = 0;
            
    //     chartDataArr.push(['Task', 'Accident Rate by Region']);
    //     console.log('regionArr...',regionArr);
    //     const pushDictoArray = (dic,setTablePage) => {
    //         for(let locationKey in dic[regionArr[regionArr.length-1]]){
    //             chartDataArr.push([locationKey, dic[regionArr[regionArr.length-1]][locationKey]]);                
    //             accidentTableDataArr.push({
    //                 location: regionArr.join(' ') + ' '+ locationKey,
    //                 accidentsCount: dic[regionArr[regionArr.length-1]][locationKey],
    //                 key: locationKey
    //             });
    //             setTablePage(accidentTableDataArr);
    //         }
    //     };

    //     const setChartData = () => {
    //         this.setState(prevState => ({
    //             ...prevState,
    //             chartData: chartDataArr,
    //             // currentRegionIndex: chartRegionIndex,
    //             // regionArr: regionArr,
    //             currentRegion: regionArr,
    //             startPage: 0,
    //             endPage: this.CONST.PAGE_COUNT < totalPageNum ? this.CONST.PAGE_COUNT-1 : Math.max(0,totalPageNum-1),
    //             currentPage: 0,
    //             totalPageCount: totalPageNum,
    //             accidentTableData: accidentTableDataArr,
    //             currentTableData: accidentTableDataArr.slice(0, arrayEndIndex),
    //         }));
    //     };
        
    //     pushDictoArray(this.state.regionData[regionArr.length],(dataArr) => {
    //         accidentDataLength = dataArr.length,
    //         totalPageNum = Math.ceil(accidentDataLength / this.CONST.PAGE_SIZE),
    //         arrayEndIndex = accidentDataLength < this.CONST.PAGE_SIZE ? accidentDataLength : this.CONST.PAGE_SIZE;    
    //     });

    //     accidentTableDataArr.sort((data1, data2) => {
    //         return data2['accidentsCount']-data1['accidentsCount'];
    //     });
        
    //     chartDataArr.sort((data1, data2) => {
    //         return data2[1]-data1[1];
    //     });
        
    //     setChartData();
    // }
    
    render() {
        // in -> <div className={pageStyles['Page__content-top']}>
        // <Button color="primary" onClick={this.onCreateMdTrigger}>새 배너 생성</Button>
        const self = this;
        let currentRegionSlice = '',
            endRegion = '';
        if(this.state.chartData.length > 1){
            if(this.state.currentRegion.length == 1)
                currentRegionSlice = this.state.currentRegion[0];
            else {
                const tempStr = this.state.currentRegion.join('>>');
                currentRegionSlice = tempStr.substring(0,tempStr.lastIndexOf('>')+1);
                endRegion = this.state.currentRegion[this.state.currentRegion.length-1];
            }
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
                            className={styles.AccidentMap__selectBox}
                            options={this.CONST.SELECTBOX_OPTIONS}
                            defaultValue={this.CONST.SELECTBOX_OPTIONS[0]}
                            changeHandler={(data) => {
                                this.onSelectBoxChangeHandler(data.target.value);
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
                                                            // console.log('this.googleMap.getCenter onBoundsChanged',this.googleMap.getCenter());
                                                        }
                                                    })
                                                }
                                                //this.state.onBoundsChanged
                                                // onDragEnd={this.state.onDragEnd}
                                                // onZoomChanged={this.state.onZoomChanged}
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
                                                // tabName={this.state.activeTab}
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
