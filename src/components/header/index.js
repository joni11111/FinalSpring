import React, {useState, useEffect} from 'react';
import '../../App.css'
import './header.css'
import { Menu, Dropdown } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {signOut} from "../../store/actions/authAction";

const { SubMenu } = Menu;

function Header(props) {
    const {isAuth} = props.authReducer;

    const [state, setState] = useState({
        current: ""
    });
    const handleClick = e => {
        console.log('click ', e);
        setState({
            current: e.key,
        });
    };

    const openSignIn = () => {
        props.history.push('/api/auth')
    };

    useEffect(() => {
        if(props.authReducer.signUpSuc) {
            openSignIn()
        }
    }, [props.authReducer.signUpSuc, props.authReducer.isAuth]);


    const unAuthMenu = (
        <Menu>
            <Link to={'/api/auth'}>
                <Menu.Item key="signin">
                    Sign in
                 </Menu.Item>
            </Link>
            <Link to={'/api/repariers/signUp'}>
                <Menu.Item key="signup">
                    Sign up
                </Menu.Item>
            </Link>
        </Menu>
    );
    const authMenu = (
        <Menu>
            <Link to={'/api/repariers'}>
                <Menu.Item key="signout" onClick={props.signOut}>
                    Sign out
                </Menu.Item>
            </Link>
        </Menu>
    );
    const unLoggedInMenu = (
        <Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">
            <Menu.Item key="rep" icon={<MailOutlined />}>
                <Link to={'/api/repariers'}>Repariers</Link>
            </Menu.Item>
            <Menu.Item key="fDev"  icon={<AppstoreOutlined />}>
                <Link to={'/api/finishedDevices'}>Finished devices</Link>
            </Menu.Item>
            <Menu.Item key="centers" >
                <Link to={'/api/centers'}>All centers</Link>
            </Menu.Item>
            <Menu.Item key="newDev" >
                <Link to={'/api/newDevice'}>Add device</Link>
            </Menu.Item>
        </Menu>
    );

    const loggedInMenu = (
        <Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal">
            <Menu.Item key="rep" icon={<MailOutlined />}>
                <Link to={'/api/repariers'}>Repariers</Link>
            </Menu.Item>
            <Menu.Item key="fDev"  icon={<AppstoreOutlined />}>
                <Link to={'/api/finishedDevices'}>Finished devices</Link>
            </Menu.Item>
            <Menu.Item key="devices" >
                <Link to={'/api/devices'}>All devices</Link>
            </Menu.Item>
            <Menu.Item key="centers" >
                <Link to={'/api/centers'}>All centers</Link>
            </Menu.Item>
            <Menu.Item key="newDev" >
                <Link to={'/api/newDevice'}>Add device</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header-menu">
            {isAuth ? loggedInMenu : unLoggedInMenu}
            <div className="header-menu-dropdown">
                <Dropdown  className="header-menu-dropdown-list" overlay={isAuth ? authMenu : unAuthMenu} trigger={['click']}>
                    <MenuOutlined />
                </Dropdown>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    authReducer: state.authReducer
});

const mapDispatchToProps = {
    signOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))
