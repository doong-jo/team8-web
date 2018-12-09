import React from 'react';
import { Route } from 'react-router-dom';
import { UserView, DeviceTestingView, AccidentView } from '../pages/';
import Header from '../components/common/Header';
import SideMenu from '../components/common/SideMenu';
import styles from './App.scss';

const App = () =>
    (
        <div className={`Header ${styles.App}`}>
            <div className={styles.App__header}>
                <header>
                    <Header />
                </header>
            </div>
            <div className={`GlobalSpace ${styles.App__globalspace}`}>
                <div className={`GlobalSide ${styles.App__globalside}`}>
                    <SideMenu />
                </div>
                <div className={`GlobalMain ${styles.App__globalmain}`}>
                    <Route exact path="/userView" render={() => <UserView pageTitle="View of users" />} />
                    <Route exact path="/deviceView" render={() => <DeviceTestingView pageTitle="View of device (for test)" />} />
                    <Route exact path="/accidentView" render={() => <AccidentView pageTitle="View of accidents" />} />
                </div>
            </div>
        </div>
    );

export default App;
