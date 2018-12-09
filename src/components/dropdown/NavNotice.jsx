import React, { Component } from 'react';


import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import IconInCircle from '../common/IconInCircle';

class NavNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList: [],
        };
        this.fetchNoticeList = this.fetchNoticeList.bind(this);
        // this.fetchNoticeList();
        this.removeNotice = this.removeNotice.bind(this);
        this.renderNoticeList = this.renderNoticeList.bind(this);
    }
    
    fetchNoticeList() {
        const fetchedNoticeList = [
            {
                id: 1,
                text: 'Option 1',
            },
            {
                id: 2,
                text: 'Option 2',
            },
        ];
        this.setState({ noticeList: fetchedNoticeList });
    }
    removeNotice(id) {
        this.setState((prevState) => {
            const newNoticeList = prevState.noticeList.filter(notice => (notice.id !== id));
            return newNoticeList;
        });
    }
    renderNoticeList() {
        let renderedNoticeList;
        if (this.state.noticeList.length) {
            renderedNoticeList = this.state.noticeList.map(notice => (
                <DropdownItem key={notice.id}>
                    {notice.text}
                </DropdownItem>
            ));
        } else {
            renderedNoticeList = (
                <DropdownItem>
                    알림이 없습니다.
                </DropdownItem>
            );
        }
        return renderedNoticeList;
    }
    render() {
        return (
            <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                    <IconInCircle iconId="bell" hasBadge badgeNum={5} />
                </DropdownToggle>
                <DropdownMenu right>
                    {this.renderNoticeList()}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

export default NavNotice;
