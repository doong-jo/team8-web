import React from 'react';
import { Route } from 'react-router-dom';
import { UserMap, DeviceTest, AccidentMap, Main, UserManager } from '../pages/';
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
                    <Route exact path="/main" render={() => <Main />} />
                    <Route exact path="/users/usermanager" render={() => <UserManager />} />
                    <Route exact path="/analysis/user" render={() => <UserMap pageTitle="View of users" />} />
                    <Route exact path="/analysis/devicetest" render={() => <DeviceTest pageTitle="View of device (for test)" />} />
                    <Route exact path="/analysis/accident" render={() => <AccidentMap pageTitle="View of accidents" />} />
                </div>
            </div>
        </div>
    );

export default App;
