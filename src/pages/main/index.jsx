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
        };
    }
    componentDidMount() {
        // Member, Project, Errors ajax call and set state.
    }
    render() {
        return (
<<<<<<< Updated upstream
            <div>
                
=======
            <div className={styles.Main__content}>
                <img className={styles.Main__content__image} src="../../../images/teameight_logo.png"/>
                <p>
                    <br/>
                    <br/>
				    IOT START TAIL LIGHT for your safty.<br/>
                    TEAM EIGHT에 오신 것을 환영합니다. <br/>
                    <br/>
                    현재 홈페이지 수리 중입니다. 잠시만 기다려 주시기 바랍니다.
    			</p>
                <a href="mailto:EIGHT@8riders.com">EIGHT@8riders.com</a>
>>>>>>> Stashed changes
            </div>
        );
    }
}

export default Main;
