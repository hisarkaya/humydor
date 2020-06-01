import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../actions/auth';

import { Icon, Dropdown, Menu, Container, Image, Label } from 'semantic-ui-react'
import Role from '../../helpers/role';

const trigger = (
    <span>
        <span style={{ 'paddingRight': '5px' }}>Hisar Kaya</span>
        <Image avatar src="https://lh3.googleusercontent.com/a-/AOh14GjiCruQgwqDNeQrwJyyepVtwUjPdfMoEalqZTsqWw" />
    </span>
)

const menuItemDatabase = (
    <span>
        <Icon name="database" />database
    </span>
)

class Header extends React.Component {

    signOutClick = () => {
        this.props.signout();
    }

    render() {

        const { isAuthenticated, role, selected } = this.props; 

        if (!isAuthenticated) {
            return null;
        }

        return (
            <div className="hmy-header">
                <Menu borderless text className="hmy-header-menu">
                    <Container>
                        <Menu.Item header>
                            <span className="hmy-brand">Hu<span>my</span>dor</span>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Dropdown
                                trigger={trigger}
                                pointing="top right"
                                icon={null}
                                item>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon="user" text="profile"></Dropdown.Item>
                                    <Dropdown.Item>
                                        <Icon name="inbox" />
                                        inbox
                                        <Label color='teal'>1</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={this.signOutClick}
                                        icon="sign-out"
                                        text="sign out"></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Menu pointing className="hmy-main-menu">
                    <Container>
                        <Menu.Item
                            as={Link} to='/'
                            active={selected === 'home'}>
                            <Icon name='home' />home
                    </Menu.Item>
                        <Menu.Item
                            as={Link} to='/cigars'
                            active={selected === 'cigars'}>
                            <Icon name='leaf' />cigars
                    </Menu.Item>
                    {   role === Role.Admin && (  
                        <Dropdown
                            item
                            className={selected === 'database' ? 'active' : ''}
                            trigger={menuItemDatabase}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/countries">
                                    countries
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/brands">
                                    brands
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/names">
                                    cigar names
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        )
                    }
                    </Container>
                </Menu>
            </div>
        );
    }
}

export default connect(null, { signout })(Header);