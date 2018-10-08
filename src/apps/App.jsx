import React from 'react';
import { Route } from 'react-router-dom';
// import { EduBanner, EduPromotion } from '../pages/index';
import { UserView } from '../pages/';
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
                    <Route exact path="/userView" render={() => <UserView pageTitle="사용자 뷰" />} />
                </div>
            </div>
        </div>
    );
// in globalmain
// <Route exact path="/edu-banner" render={() => <EduBanner pageTitle="배너 관리" />} />
// <Route exact path="/edu-promotion" render={() => <EduPromotion pageTitle="프로모션 관리" />} />
// <Route exact path="/edu-banner" render={()=><EduBanner pageTitle="배너 관리"/>}/>
// <Route exact path="/edu-banner" component={EduBanner} />

// function App() {
//     return (
//         <div className={`Header ${styles.App}`}>
//             <div className={styles.App__header}>
//                 <header>
//                     <Header />
//                 </header>
//             </div>
//             <div className={`GlobalSpace ${styles.App__globalspace}`}>
//                 <div className={`GlobalSide ${styles.App__globalside}`}>
//                     <SideMenu />
//                 </div>
//                 <PageProvieder>
//                     <div className={`GlobalMain ${styles.App__globalmain}`}>
//                         <Route exact path="/main" component={Main} />
//                         <Route exact path="/user" component={User} />
//                         <Route exact path="/edu-promotion" component={EduPromotion} />
//                         <Route exact path="/edu-banner" component={EduBanner} />
//                     </div>
//                 </PageProvieder>
//             </div>
//         </div>
//     );
// }

// import React from 'react';
// import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Main, User } from '../pages/index';
// import Header from '../components/common/Header';

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             initState: props.initState,
//         };
//     }
//     render() {
//         return (
//             <div>
//                 <Header />
//                 <Route exact path="/main" component={Main} />
//                 <Route exact path="/user" component={User} />
//             </div>
//         );
//     }
// }

// App.propTypes = {
//     initState: PropTypes.string.isRequired,
// };

// export default App;


export default App;
