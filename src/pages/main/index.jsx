import React from 'react';
import styles from './style.scss';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }
    
    render() {
        return (
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
            </div>
        );
    }
}

export default Main;
