// Utility Components
import React, { Component } from 'react';
import { Button } from 'reactstrap';
// import has from 'has';
import axios from 'axios';
import PropTypes from 'prop-types';

// User-define Components
import pageStyles from '../../Page.scss';
import styles from './style.scss';
import { timeFormatter, getFullUri } from '../../Page';

import ToolBar from '../../components/common/ToolBar';
import Icon from '../../components/icons';
import { ConfirmModal } from '../../pages/components/modal/Modal';

// Open-source Components
import Table from 'rc-table';
import 'rc-table/assets/index.css';

import { compose, withProps } from 'recompose';

const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require('react-google-maps');

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

const jamsuBridgeLat = 37.512180;
const jamsuBridgeLong = 126.998455;


const MapWithAMarker = withScriptjs(withGoogleMap(props => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={props.center}
        center={props.center}
    >
        <Marker
            position={props.center}
        />
        <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
            defaultOptions={
                {
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [
                            google.maps.drawing.OverlayType.CIRCLE,
                            google.maps.drawing.OverlayType.POLYGON,
                            google.maps.drawing.OverlayType.POLYLINE,
                            google.maps.drawing.OverlayType.RECTANGLE,
                        ],
                    },
                    circleOptions: {
                        fillColor: '#ffff00',
                        fillOpacity: 1,
                        strokeWeight: 5,
                        clickable: false,
                        editable: true,
                        zIndex: 1,
                    },
                }
            }
        />
    </GoogleMap>
)));

class UserView extends Component {
    constructor(props) {
        super(props);

        this.onDeleteConfirmMdTrigger = this.onDeleteConfirmMdTrigger.bind(this);
        this.onDeleteAcceptBtnClicked = this.onDeleteAcceptBtnClicked.bind(this);

        this.state = {
            deleteConfirmModalShow: false,
            curGoogleMapPos: {
                lat: chungmuroLat,
                lng: chungmuroLong,
            },
        };
        
        this.state.tableData = [
            {
                key: 1,
                profile: '',
                phone: '01034030392',
                status: 'blue',
            },
            {
                key: 2,
                profile: '',
                phone: '01049395939',
                status: 'blue',
            },
            {
                key: 3,
                profile: '',
                phone: '01034823161',
                status: 'red',
                alert: 'emergency',
            },
            {
                key: 4,
                profile: '',
                phone: '01039593923',
                status: 'blue',
            },
            {
                key: 5,
                profile: '',
                phone: '01059495938',
                status: 'blue',
            },
            {
                key: 6,
                profile: '',
                phone: '01094893945',
                status: 'blue',
            },
            {
                key: 7,
                profile: '',
                phone: '01006948394',
                status: 'blue',
            },
            {
                key: 8,
                profile: '',
                phone: '01034395594',
                status: 'blue',
            },
            {
                key: 9,
                profile: '',
                phone: '01034593293',
                status: 'blue',
            },
            {
                key: 10,
                profile: '',
                phone: '01031613482',
                status: 'blue',
            },
        ];
        
        this.apiUri = {
            user: '/userView/user',
        };

        this.getLocation(this);
        this.getUserEmergencyState();
    }
    

    componentDidMount() {

    }

    onCellClick(thisPageComponent, index, event) {
        if (index === 2) {
            thisPageComponent.setState(prevState => ({
                ...prevState,
                deleteConfirmModalShow: !prevState.deleteConfirmModalShow,
                curGoogleMapPos: {
                    lat: jamsuBridgeLat,
                    lng: jamsuBridgeLong,
                },
            }));
        }
    }
    onDeleteAcceptBtnClicked() {
        this.setState(prevState => ({
            ...prevState,
            deleteConfirmModalShow: !prevState.deleteConfirmModalShow,
        }));
    }

    onDeleteConfirmMdTrigger() {
        this.setState(prevState => ({
            ...prevState,
            deleteConfirmModalShow: !prevState.deleteConfirmModalShow,
        }));
    }

    getLocation(thisComponent) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                thisComponent.setState(prevState => ({
                    ...prevState,
                    curGoogleMapPos: pos,
                }));

                return pos;
            }, () => {
                // handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }

        return {
            lat: chungmuroLat,
            lng: chungmuroLong,
        };
    }
    
    async getUserEmergencyState() {
        
        const queryObj = {
            limit: 1,
            id: "sdong001"
        };
        
        await axios.get(getFullUri(this.apiUri.user, queryObj))
            .then((res) => {
                let result = res.data[0];
            
                console.log('result', result);
                console.log('result.emergency', result.emergency);
            
                let modifyTableData = this.state.tableData;
            
                if(result.emergency === true) {
                    modifyTableData[2].status = 'red';
                    modifyTableData[2].alert = 'emergency';
                } else {
                    modifyTableData[2].status = 'blue';
                    modifyTableData[2].alert = '';
                }
            
                console.log('modifyTableData[2]', modifyTableData[2]);
                
            
                this.setState(prevState => ({
                    ...prevState,
                    tableData: modifyTableData,
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
                            onClick={() => { this.getLocation(this); }}
                        >
                            Set my location
                        </Button>
                    </div>

                    <div>
                        <div className={styles.UserView__googleMap}>
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2frTy4tc-UaInRtQYs3rTZO5QdH3js0k&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: '100%' }} />}
                                containerElement={<div style={{ height: '700px' }} />}
                                mapElement={<div style={{ height: '100%' }} />}
                                center={this.state.curGoogleMapPos}
                            />
                        </div>

                        <div className={styles.UserView__dataTable}>
                            <Table
                                columns={columns}
                                data={this.state.tableData}
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
                    isOpen={this.state.deleteConfirmModalShow}
                    fade={true}
                    backdrop={false}
                    centered
                    size="md"
                    modalHeader="확인"
                    modalBody="Emergency situation type 404 occured!"
                    confirmIcon={emergencyIcon}
                    onClose={this.onDeleteConfirmMdTrigger}
                    cancelBtn
                    cancelBtnTxt="Cancel"
                    onAccept={this.onDeleteAcceptBtnClicked}
                    acceptBtnTxt="See Details"
                />
            </div>
        );
    }
}

UserView.defaultProps = {
    pageTitle: 'no title',
};

UserView.propTypes = {
    pageTitle: PropTypes.string,
};

export default UserView;
