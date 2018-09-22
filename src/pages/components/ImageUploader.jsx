import React, { Component } from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import has from 'has';
import {
    FormGroup,
    Label,
    Row,
    Col,
    Button,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import Pagination from 'react-js-pagination';

import styles from './ImageUploader.scss';
import paginationStyles from './DataTable.scss';

import imgsize_sm from '../../../public/images/sm.jpg';
import imgsize_md from '../../../public/images/md.jpg';
import imgsize_lg from '../../../public/images/lg.jpg';
import imgsize_noimage from '../../../public/images/noimage.jpg';

const defaultImg = {
    sm: imgsize_sm,
    md: imgsize_md,
    lg: imgsize_lg,
    noimage: imgsize_noimage
};

import img_default from '../../../public/images/ajax_loader.gif';

const firstButtonStyle = {
    marginLeft: '15px'
}

class ImgInput extends React.PureComponent {
    render() {
        return (
            <div className={styles['ImgUploader__img-uploadwrapper']}>
                <input 
                    className={styles['ImgUploader__img-fileInput']}
                    name={this.props.name}
                    type="file"
                    onChange={this.props.handleImageInputChange}
                />
                {(this.props.src !== '' || this.props.src) && 
                    <img src={this.props.src} />    
                }
                {(this.props.src === '' || !this.props.src) &&
                    <Button className={styles['ImgUploader__img-defaultBtn']} color="secondary" onClick={this.props.onClick}>{this.props.imgSize}</Button>
                }
            </div>
        );
    }
}

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            //For set db file data
            // data: {
            //     smSrc: [],
            //     mdSrc: [],
            //     lgSrc: [],
            // },
            src: '',
            //For set preview
            smSrc: [],
            mdSrc: [],
            lgSrc: [],
            link: [],
            description: [],
            key: [],
            
            smSrcFile: [],
            mdSrcFile: [],
            lgSrcFile: [],
            
            pagination: {
                activePage: 1,
                totalItemsCount: 1,
            },
            
            pivotBannerInd: 0,
        };
        
        this.bannerPaginationRange = 10;
        this.bannerPaginationOffset = 1;
        
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onAddBannerItemBtnClicked = this.onAddBannerItemBtnClicked.bind(this);
        this.onRmBannerItemBtnClicked = this.onRmBannerItemBtnClicked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log('src componentDidMount');
        const bannerLen = this.props.value.length;
        
        if( !this.props.multiSize || !this.props.dynamicSize ) { return; }
        
        const smProp = [];
        const mdProp = [];
        const lgProp = [];
        const linkProp = [];
        const descProp = [];
        const keyProp = [];
        
        this.props.value.map((value, i) => {
            smProp[i] = value.src.sm;
            mdProp[i] = value.src.md;
            lgProp[i] = value.src.lg;
            linkProp[i] = value.link;
            descProp[i] = value.description;
            keyProp[i] = value.key;
        });
        
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                totalItemsCount: bannerLen,
            },
            smSrc: smProp,
            mdSrc: mdProp,
            lgSrc: lgProp,
            link: linkProp,
            description: descProp,
            key: keyProp,
        }));
    }
    onUploadBtnClicked(size) {

    }
    onPaginationChange(pageNumber) {
        this.setState({
            pivotBannerInd: pageNumber-1,
            pagination: {
                ...this.state.pagination,
                activePage: pageNumber,
            },
            smSrc: this.state.smSrc,
            mdSrc: this.state.mdSrc,
            lgSrc: this.state.lgSrc,
            link: this.state.link,
            description: this.state.description,
            key: this.state.key,
        });
    }
    onAddBannerItemBtnClicked() {

        if( this.state.pagination.totalItemsCount >= 10 ) return;
        
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                activePage: prevState.pagination.totalItemsCount+1,
                totalItemsCount: prevState.pagination.totalItemsCount+1,
            },
            pivotBannerInd: prevState.pagination.totalItemsCount,
        }), () => {
            this.setState({
                link: update(this.state.link, {[this.state.pivotBannerInd]: {$set: ''}}),
                description: update(this.state.description, {[this.state.pivotBannerInd]: {$set: ''}}),
                key: update(this.state.key, {[this.state.pivotBannerInd]: {$set: ''}}),
            });
        });
    }
    onRmBannerItemBtnClicked() {

        if( this.state.pagination.totalItemsCount <= 1 ) return;
        
        let movePage;
        
        // if(this.pivotBannerInd+1 <= this.state.pagination.totalItemsCount) {
        //     movePage = 
        // }
        
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                activePage: prevState.pagination.activePage-1,
                totalItemsCount: prevState.pagination.totalItemsCount-1,
            },
            smSrc: update(this.state.smSrc, {$splice: [[this.state.pivotBannerInd,1]]}),
            mdSrc: update(this.state.mdSrc, {$splice: [[this.state.pivotBannerInd,1]]}),
            lgSrc: update(this.state.lgSrc, {$splice: [[this.state.pivotBannerInd,1]]}),
            pivotBannerInd: prevState.pivotBannerInd-1,
        }));
    }
    async handleImageInputChange(imgSize, file) {
        const reader = new FileReader();
        let name = file.target.name;
        const files = file.target.files;
        let cpFiles;
        
        console.log(name);
        // name = this.props.dynamicSize ? name.concat(this.state.pivotBannerInd) : name;
        if (files.length === 0) {
            
            this.setState({
                data: {
                    ...this.state.data,
                    [name]: '',
                },
                [name]: '',
            });
        } else {
            cpFiles = Object.assign({}, files);
            file.target.value = null;
            
            reader.onloadend = () => {
                if( this.props.dynamicSize ) {
                    this.setState({
                        [name.concat('File')]: update(this.state[name.concat('File')],
                           {[this.state.pivotBannerInd]:
                            {$set: cpFiles}}),
                        // [fileDataName]: update(fileDataName,
                        //                    {[this.state.pivotBannerInd]: 
                        //                     {$set: cpFiles}}),
                        [name]: update(this.state[name],
                                       {[this.state.pivotBannerInd]: 
                                        {$set: reader.result}}),
                    });
                    
                    this.props.onChangeHandler({
                        target: {
                            name: this.props.fieldName,
                            value: {
                                smSrcFile: this.state.smSrcFile,
                                mdSrcFile: this.state.mdSrcFile,
                                lgSrcFile: this.state.lgSrcFile,
                                smSrc: this.state.smSrc,
                                mdSrc: this.state.mdSrc,
                                lgSrc: this.state.lgSrc,
                                link: this.state.link,
                                description: this.state.description,
                                key: this.state.key,
                            },
                        }
                    });
                }else {
                    this.setState({
                        data: {
                            ...this.state.data,
                            [name]: cpFiles,
                        },
                        [name]: reader.result,
                    });
                    
                    this.props.onChangeHandler({
                        target: {
                            name: this.props.fieldName,
                            value: cpFiles,
                        }
                    });
                }
            }
            
            console.log('cpFiles', cpFiles);
            
            await reader.readAsDataURL(cpFiles[0]);
        }
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleInputChange(e) {
        this.setState({
            [e.target.name]: update(this.state[e.target.name], {[this.state.pivotBannerInd]: {$set: e.target.value}}),
        }, () => {
            const changes = {
                target: {
                    name: this.props.fieldName,
                    value: {
                        smSrcFile: this.state.smSrcFile,
                        mdSrcFile: this.state.mdSrcFile,
                        lgSrcFile: this.state.lgSrcFile,
                        smSrc: this.state.smSrc,
                        mdSrc: this.state.mdSrc,
                        lgSrc: this.state.lgSrc,
                        link: this.state.link,
                        description: this.state.description,
                        key: this.state.key,
                    },
                }
            };
            this.props.onChangeHandler(changes);
        });
        
        // changes.target.value[e.target.name] = e.target.value;
        
        
    }
    render() {
        const addonBannerContainerBtn = {
            marginLeft: '10px',
        };
        
        return (
            <FormGroup
                row
                className={styles.ImageUploader__img}
            >
                { this.props.multiSize &&
                    
                    <Row className={styles.ImgUploader__row}>
                        {this.props.dynamicSize &&
                            <div className={styles.ImgUploader__addonBanner}>
                                <Button color="secondary"
                                    onClick={this.onAddBannerItemBtnClicked}
                                >추가</Button>
                                <Button
                                    color="danger"
                                    onClick={this.onRmBannerItemBtnClicked}
                                    style={addonBannerContainerBtn}
                                >제거</Button>
                            </div>
                        }
                        <Col sm={4}>
                            <ImgInput 
                                imgSize="upload sm image"
                                name="smSrc"
                                src={this.state.smSrc[this.state.pivotBannerInd]}
                                onClick={this.onUploadBtnClicked.bind(this, "sm")}
                                handleImageInputChange={this.handleImageInputChange.bind(this, "smSrc")}
                            />
                            <div>
                                
                            </div>
                        </Col>
                        <Col sm={4}>
                            <ImgInput 
                                imgSize="upload md image"
                                name="mdSrc"
                                src={this.state.mdSrc[this.state.pivotBannerInd]}
                                onClick={this.onUploadBtnClicked.bind(this, "md")}
                                handleImageInputChange={this.handleImageInputChange.bind(this, "mdSrc")}
                            />
                        </Col>
                        <Col sm={4}>
                            <ImgInput 
                                imgSize="upload lg image"
                                name="lgSrc"
                                src={this.state.lgSrc[this.state.pivotBannerInd]}
                                onClick={this.onUploadBtnClicked.bind(this, "lg")}
                                handleImageInputChange={this.handleImageInputChange.bind(this, "lgSrc")}
                            />
                        </Col>
                        <div className={styles.ImgUploader__info}>
                            <Row>
                                <Label
                                    for="link"
                                    sm="2"
                                >
                                    link
                                </Label>
                                <Col sm="10">
                                    <AvField
                                        key="link"
                                        type="text"
                                        name="link"
                                        onBlur={this.handleInputChange}
                                        value={this.state.link[this.state.pivotBannerInd]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label
                                    for="description"
                                    sm="2"
                                >
                                    description
                                </Label>
                                <Col sm="10">
                                    <AvField
                                        key="description"
                                        type="textarea"
                                        name="description"
                                        onBlur={this.handleInputChange}
                                        value={this.state.description[this.state.pivotBannerInd]}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label
                                    for="key"
                                    sm="2"
                                >
                                    key
                                </Label>
                                <Col sm="10">
                                    <AvField
                                        key="key"
                                        type="textarea"
                                        name="key"
                                        onBlur={this.handleInputChange}
                                        value={this.state.key[this.state.pivotBannerInd]}
                                    />
                                </Col>
                            </Row>
                        </div>
                        
                        <div className={paginationStyles['DataTable__pagination-container']}>
                            <div className={paginationStyles['DataTable__pagination-sub-container']}>
                                {this.props.dynamicSize &&
                                    <Pagination
                                        hideFirstLastPages
                                        // 페이지네이션 노출 번호 수 [1, 2, 3 ... 10]
                                        pageRangeDisplayed={this.bannerPaginationRange}
                                        // 활성 페이지 번호
                                        activePage={this.state.pagination.activePage}
                                        // 각 페이지의 아이템 수
                                        itemsCountPerPage={this.bannerPaginationOffset}
                                        // 전체 아이템 수
                                        totalItemsCount={this.state.pagination.totalItemsCount}
                                        onChange={this.onPaginationChange}
                                        prevPageText="«"
                                        nextPageText="»"
                                        linkClassPrev="page-link"
                                        linkClassNext="page-link"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                }
                            </div>
                        </div>
                    </Row>
                }
                { !this.props.multiSize &&
                    <Row className={styles.ImgUploader__row}>
                        <Col sm={12}>
                            <ImgInput
                                imgSize="upload image"
                                name="src"
                                src={this.state.src}
                                onClick={this.onUploadBtnClicked.bind(this, "nosize")}
                                handleImageInputChange={this.handleImageInputChange.bind(this, "src")}
                            />
                        </Col>
                    </Row>
                }
            </FormGroup>
        );
    }
}

export default ImageUploader;
