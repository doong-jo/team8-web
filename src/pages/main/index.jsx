import React from 'react';
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
            <div>
                <img className={styles.Main__content__image} src="../../../images/teameight_logo.png"/>
            </div>
        );
    }
}

export default Main;
