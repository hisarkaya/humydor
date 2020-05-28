import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../actions/auth';

import { Icon, Dropdown, Menu, Container, Image, Label } from 'semantic-ui-react'

const trigger = (
    <span>
        <span style={{ 'paddingRight': '5px' }}>Hisar Kaya</span>
        <Image avatar src="https://lh3.googleusercontent.com/a-/AOh14GjiCruQgwqDNeQrwJyyepVtwUjPdfMoEalqZTsqWw" />
    </span>
)

class Header extends React.Component {

    signOutClick = () => {
        this.props.signout();
    }

    render() {

        if (!this.props.isAuthenticated) {
            return null;
        }

        return (
            <div className="hmy-header"> 
                <Menu borderless text className="hmy-header-menu">
                    <Container>
                        <Menu.Item header>
                            <span className="hmy-brand">Humydor</span>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Dropdown
                                trigger={trigger}
                                pointing="top right"
                                icon={null}
                                item>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon="user" text="Profile"></Dropdown.Item>
                                    <Dropdown.Item>
                                        <Icon name="inbox" />
                                        Inbox
                                        <Label color='teal'>1</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={this.signOutClick}
                                        icon="sign-out"
                                        text="Sign out"></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Menu pointing className="hmy-main-menu">
                    <Container>
                        <Menu.Item
                            as={Link} to='/' 
                            active={this.props.selected === 'home'}>
                            <Icon name='home' />Home
                    </Menu.Item>
                        <Menu.Item
                            as={Link} to='/cigars' 
                            active={this.props.selected === 'cigars'}>
                            <Icon name='leaf' />Cigars
                    </Menu.Item>
                        <Menu.Item
                            as={Link} to='/database' 
                            active={this.props.selected === 'database'}>
                            <Icon name='database' />Database
                    </Menu.Item>
                    </Container>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        noplace: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { signout })(Header);