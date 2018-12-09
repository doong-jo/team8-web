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
                    <span className={`TopMenu ${styles.SideMenu__top}`}> Users </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="/user">
                                <Icon 
                                    style={iconStyle}
                                    iconId="user" 
                                />
								User
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> Services </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="#">
                                <Icon 
                                    style={iconStyle}
                                    iconId="course-history" 
                                />
								LED
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> Analysis </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="/userview">
                                <Icon 
                                    style={iconStyle}
                                    iconId="course-history" 
                                />
								Users
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/deviceview">
                                <Icon 
                                    style={iconStyle}
                                    iconId="course-history" 
                                />
								Device testing
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/accidentview">
                                <Icon 
                                    style={iconStyle}
                                    iconId="course-history" 
                                />
								Accidents
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className={styles.SideMenu__menu}>
                    <span className={`TopMenu ${styles.SideMenu__top}`}> Payment </span>
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="#">
                                <Icon 
                                    style={iconStyle}
                                    iconId="price" 
                                />
								App
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>
        )
    }
}
