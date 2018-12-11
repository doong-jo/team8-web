// Utility Components
import React, { Component } from 'react';
import { Button } from 'reactstrap';
// import has from 'has';
import axios from 'axios';
import PropTypes from 'prop-types';

// User-define Components
import pageStyles from '../../../Page.scss';
import styles from './style.scss';
import { timeFormatter, getFullUri } from '../../../Page';

import ToolBar from '../../../components/common/ToolBar';
import Icon from '../../../components/icons';
import { ConfirmModal } from '../../../pages/components/modal/Modal';

// Open-source Components
import Table from 'rc-table';
import 'rc-table/assets/index.css';

import { compose, withProps } from 'recompose';

const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    StreetViewPanorama,
    OverlayView,
} = require('react-google-maps');

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
})


const { DrawingManager } = require('react-google-maps/lib/components/drawing/DrawingManager');

// const onRowClick = (record, index, event) => {
//     console.log(`Click nth(${index}) row of parent, record.name: ${record.name}`);
//     // See https://facebook.github.io/react/docs/events.html for original click event details.

//     if (index === 2) {
//         this.setState(prevState => ({
//             ...prevState,
//             deleteConfirmModalShow: !prevState.deleteConfirmModalShow,
//         }));
//     }

//     if (event.shiftKey) {
//         console.log('Shift + mouse click triggered.');
//     }
// };

const onRowDoubleClick = (record, index) => {
    console.log(`Double click nth(${index}) row of parent, record.name: ${record.name}`);
};

const columns = [
    {
        title: 'Profile',
        dataIndex: 'profile',
        key: 'profile',
        width: 40,
        render: text =>
            <span><svg height="30" width="30"><circle cx="15" cy="15" r="12" fill="#CCCCCC" /></svg></span>,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 50,
        render: text =>
            <span><font size="4">{text}</font></span>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 10,
        render: text =>
            <span><svg height="10" width="10"><circle cx="5" cy="5" r="4" fill={text} /></svg> </span>,
    },
    {
        title: 'Alert',
        dataIndex: 'alert',
        key: 'alert',
        width: 10,
        render: text =>
            <div>{text === 'emergency' && <span><Icon size="22px" color="#D40404" iconId="exclamation-triangle" /></span>}</div>,
    },
];

const chungmuroLat = 37.5634236;
const chungmuroLong = 126.9918384;

const MapWithAMarker = withScriptjs(withGoogleMap(props => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={props.center}
        center={props.center}
    >
        <StreetViewPanorama 
            defaultPosition={props.center} 
            position={{ lat: props.streetViewLat, lng: props.streetViewLong }} 
            visible={props.streetViewVisible}
            onVisibleChanged={props.streetViewVisibleChanged}>
            <OverlayView
                position={{ lat: props.streetViewLat, lng: props.streetViewLong }}
                mapPaneName={OverlayView.OVERLAY_LAYER}
                getPixelPositionOffset={getPixelPositionOffset}
            >
                <div style={{ background: `red`, color: `white`, padding: 5, borderRadius: `50%` }}>
                    Accident Position
                </div>
            </OverlayView>
        </StreetViewPanorama>
        <Marker
            position={props.center}
        />
    </GoogleMap>
)));

class UserMap extends Component {
    constructor(props) {
        super(props);

        this.onCellConfirmMdTrigger = this.onCellConfirmMdTrigger.bind(this);
        this.onCellAcceptBtnClicked = this.onCellAcceptBtnClicked.bind(this);
        this.onStreetViewVisibleChanged = this.onStreetViewVisibleChanged.bind(this);
        this.getLocation = this.getLocation.bind(this);

        this.state = {
            cellConfirmModalShow: false,
            curGoogleMapPos: {
                lat: chungmuroLat,
                lng: chungmuroLong,
            },
            userTableData: [],
            accidentData: [],
            accidentUserDataStr: "",
            streetViewVisible: false,
            streetViewPos: {
                latitude: null,
                longitude: null,
            }
        };
        
        this.apiUri = {
            // user: '/userView/user',
            user: '/user',
            accident: '/accident',
        };

        this.getLocation();
        this.getUserEmergencyState();
    }
    
    componentDidMount() {

    }

    async onCellClick(thisPageComponent, index, event) {
        console.log("emergency row : " + thisPageComponent.state.userTableData[index].alert);
        const pivot = thisPageComponent.state.userTableData[index];
        
        if ( pivot.alert === "emergency" ) {
            const queryObj = {
                user_id: pivot.email,
                sort: "occured_date",
                order: -1,
                limit: 1,
            };
            
            await axios.get(getFullUri(thisPageComponent.apiUri.accident, queryObj))
                .then((res) => {
                    let result = res.data[0];
                    
                    console.log("result accident data : ", result);
                    
                    thisPageComponent.setState(prevState => ({
                        ...prevState,
                        cellConfirmModalShow: !prevState.cellConfirmModalShow,
                        curGoogleMapPos: {
                            lat: result.position.latitude,
                            lng: result.position.longitude,
                        },
                        
                        accidentUserDataStr:
                            "이메일 : " + pivot.email + "\n" +
                            "이름 : " + pivot.name + "\n" +
                            "전화번호 : " + pivot.phone + "\n" +
                            "라이딩 유형 : " + pivot.riding_type + "\n" +
                            "마지막 접속 : " + pivot.lastAccess + "\n" +
                            "위치 : " + result.position.latitude + ", " + result.position.longitude + "\n",
                    }));
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
    
    onCellAcceptBtnClicked() {
        console.log('called onCellAcceptBtnClicked!');
        
        this.setState(prevState => ({
            ...prevState,
            streetViewPos: prevState.curGoogleMapPos,
            streetViewVisible: true,
            cellConfirmModalShow: !prevState.cellConfirmModalShow,
        }));
    }

    onCellConfirmMdTrigger() {
        this.setState(prevState => ({
            ...prevState,
            cellConfirmModalShow: !prevState.cellConfirmModalShow,
        }));
    }

    getLocation() {
        console.log("called getLocation!");
        
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
                }));

                return pos;
            }, (error) => {
                console.log("handleLocationError Geolocation: ", error);
                // handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            console.log("Browser doesn't support Geolocation");
            // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    
    async getUserEmergencyState() {
        
        const queryObj = {
            // limit: 1,
            // id: "sdong001"
            email: "sdong001@gmail.com",
            sort: "name",
            order: 1,
            limit: 10,
        };
        
        await axios.get(getFullUri(this.apiUri.user, queryObj))
            .then((res) => {
                let result = res.data;
            
                console.log('data length: ' + res.data.length);
                console.log('result', result);
                console.log('result.emergency', result.emergency);
                
                let newTableData = [];
                for (var i = 0; i < result.length; i++) {
                    const pivot = result[i];
                    newTableData[i] = {
                        key: i,
                        profile: '',
                        phone: pivot.phone,
                        email: pivot.email,
                        name: pivot.name,
                        riding_type: pivot.riding_type,
                        status: pivot.emergency ? 'red' : 'blue',
                        alert: pivot.emergency ? 'emergency' : '',
                    };
                }
                
                this.setState(prevState => ({
                    ...prevState,
                    userTableData: newTableData,
                }));
            });
        
    }

    render() {
        const emergencyIcon = <Icon size="84px" color="#D40404" iconId="exclamation-triangle" />;

        // in -> <div className={pageStyles['Page__content-top']}>
        // <Button color="primary" onClick={this.onCreateMdTrigger}>새 배너 생성</Button>
        const self = this;

        return (

            <div>
                <ToolBar
                    title={this.props.pageTitle}
                />
                <section className={pageStyles.Page__content}>
                    <div>
                        <Button
                            color="primary"
                            className={pageStyles['Page__content__table__row-btn']}
                            onClick={this.getLocation}
                        >
                            Set my location
                        </Button>
                    </div>

                    <div>
                        <div className={styles.UserMap__googleMap}>
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2frTy4tc-UaInRtQYs3rTZO5QdH3js0k&v=3.exp&libraries=geometry,places"
                                loadingElement={<div style={{ height: '100%' }} />}
                                containerElement={<div style={{ height: '700px' }} />}
                                mapElement={<div style={{ height: '100%' }} />}
                                center={this.state.curGoogleMapPos}
                                streetViewVisible={this.state.streetViewVisible}
                                streetViewVisibleChanged={this.onStreetViewVisibleChanged}
                                streetViewLat={this.state.streetViewPos.lat}
                                streetViewLong={this.state.streetViewPos.lng}
                            />
                        </div>

                        <div className={styles.UserMap__dataTable}>
                            <Table
                                columns={columns}
                                data={this.state.userTableData}
                                showHeader={false}
                                onRow={(record, index) => ({
                                    onClick: this.onCellClick.bind(null, this, index),
                                    onDoubleClick: onRowDoubleClick.bind(null, record, index),
                                })}
                            />
                        </div>
                    </div>
                </section>
                <ConfirmModal
                    isOpen={this.state.cellConfirmModalShow}
                    fade={true}
                    backdrop={false}
                    centered
                    size="md"
                    modalHeader="확인"
                    modalBody={this.state.accidentUserDataStr}
                    confirmIcon={emergencyIcon}
                    onClose={this.onCellConfirmMdTrigger}
                    cancelBtn
                    cancelBtnTxt="Cancel"
                    onAccept={this.onCellAcceptBtnClicked}
                    acceptBtnTxt="See Roadview"
                />
            </div>
        );
    }
}

UserMap.defaultProps = {
    pageTitle: 'no title',
};

UserMap.propTypes = {
    pageTitle: PropTypes.string,
};

export default UserMap;
