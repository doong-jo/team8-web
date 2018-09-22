import React from 'react';
import { Row, Col } from 'reactstrap';
import * as d3 from 'd3';
import DashboardCard from './components/DashboardCard';
import ToolBar from '../../components/common/ToolBar';
import { timeFormatter } from '../../page';
import styles from './style.scss';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberMainItem: {
                totalMember: {
                    name: '전체',
                    value: 78979,
                },
            },
            memberSubItems: {
                curOnline: {
                    name: '현재 접속중',
                    value: 78979,
                },
                todayOnline: {
                    name: '오늘 접속한',
                    value: 0,
                },
                todaySignedUp: {
                    name: '오늘 가입한',
                    value: 0,
                },
            },
            projectMainItem: {
                totalProject: {
                    name: '전체',
                    value: 21600,
                },
            },
            projectSubItems: {
                usingProject: {
                    name: '사용중',
                    value: 0,
                },
            },
            // defaultAgoDate: 30,
            // topErrorNum: 10,
            dateRange: {
                startDate: null,
                endDate: new Date(),
            },
        };
    }
    componentDidMount() {
        // Member, Project, Errors ajax call and set state.
    }
    render() {
        return (
            <div>
                <ToolBar title="요약" />
                <section className={`Content ${styles.Main__content}`}>
                    <Row>
                        <Col
                            xs="6"
                            sm="6"
                            md="3"
                        >
                            <DashboardCard
                                title="회원 수"
                                mainItem={this.state.memberMainItem}
                                subItems={this.state.memberSubItems}
                            />
                        </Col>
                        <Col
                            xs="6"
                            sm="6"
                            md="3"
                        >
                            <DashboardCard
                                title="프로젝트"
                                mainItem={this.state.projectMainItem}
                                subItems={this.state.projectSubItems}
                            />
                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

export default Main;
