import React from 'react';
import { Row, Col } from 'reactstrap';
import * as d3 from 'd3';
import DashboardCard from './components/DashboardCard';
import ToolBar from '../../components/common/ToolBar';
import { timeFormatter } from '../../page';
import styles from './style.scss';

//test commit
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
            <div>
                
            </div>
        );
    }
}

export default Main;
