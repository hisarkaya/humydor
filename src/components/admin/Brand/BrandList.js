import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';
import { fetchBrands } from '../../../actions/database';


class BrandList extends React.Component {

    componentDidMount() {
        this.props.fetchBrands();
    }

    renderList = () => {
        const { brands } = this.props;

        if (!brands) {
            return null;
        }

        return Object.keys(brands).map(item => {
            const brand = brands[item];
            const editTo = `/brands/edit/${item}`;
            const deleteTo = `/brands/delete/${item}`;
            const displayTo = `/brands/display/${item}`;
            
            return (
                <tr key={item}>
                    <td data-label="name">{brand.name}</td>
                    <td className="right aligned collapsing">
                        <div className="ui small basic icon buttons">
                        <Link className="ui button" to={displayTo}>
                                <i className="icon blue info circle" />
                            </Link>
                            <Link className="ui button" to={editTo}>
                                <i className="edit icon" />
                            </Link>
                            <Link className="ui button" to={deleteTo}>
                                <i className="delete red icon" />
                            </Link>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <MemberTemplate
                className="hmy-brand-list"
                pageCode="database">
                <Toolbar header="brand list">
                    <Link to="/brands/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                </Toolbar>
                <table className="ui celled  attached fluid table">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </MemberTemplate>
        );
    }
}

const mapStateToProps = state => {
    return {
        brands: state.database.brands
    }
}

export default connect(mapStateToProps, { fetchBrands })(BrandList);