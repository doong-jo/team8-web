import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import styles from './SideMenu.scss';
import Icon from '../icons';

export default class SideMenu extends React.Component {
	render() {
		
		const iconStyle = {
			'marginRight' : '3px'
		};
		
		return (
			<div className={`SideMenu ${styles.SideMenu}`}  >
                <div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> 사용자 관리 </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="/user">
								<Icon 
									style={iconStyle}
									iconId="user" 
								/>
								사용자 관리
							</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> 서비스 운영 관리 </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="#">
								<Icon 
									style={iconStyle}
									iconId="course-history" 
								/>
								LED 관리
							</NavLink>
                        </NavItem>
                    </Nav>
                </div>
				<div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> 데이터 뷰 </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="/tracking">
								<Icon 
									style={iconStyle}
									iconId="course-history" 
								/>
								트래킹 뷰
							</NavLink>
                        </NavItem>
						<NavItem>
                            <NavLink href="/userview">
								<Icon 
									style={iconStyle}
									iconId="course-history" 
								/>
								사용자 뷰
							</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> 결제 관리 </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="#">
								<Icon 
									style={iconStyle}
									iconId="price" 
								/>
								인앱 결제
							</NavLink>
                        </NavItem>
                    </Nav>
                </div>
			</div>
		)
	}
	
}
