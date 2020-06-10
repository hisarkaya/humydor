import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Pagination from '../../membership/Pagination';
import Toolbar from '../../membership/Toolbar';
import { fetchBrands, fetchSortedBrands, fetchSearchedBrands } from '../../../actions/database';


class BrandList extends React.Component {

    state = {
        search: ''
    }

    componentDidMount() {
        const { fetchBrands, brands } = this.props;
        fetchBrands();
        if (brands) {
            this.setState({ search: brands.search });
        }
    }

    renderList = () => {

        const { brands } = this.props;

        if (!brands) {
            return null;
        }

        if (!brands.data.length) {
            return (
                <tr>
                    <td colSpan="2">
                        No brands found.
                    </td>
                </tr>
            );
        }

        return brands.data.map(brand => {
            const key = brand.key;
            const editTo = `/brands/edit/${key}`;
            const deleteTo = `/brands/delete/${key}`;
            const displayTo = `/brands/display/${key}`;

            return (
                <tr key={key}>
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

    sortList = (column, currentOrder) => {
        this.props.fetchSortedBrands(column, currentOrder === 'desc' ? 'asc' : 'desc');
    }

    onSearchChange = e => {
        this.setState({ search: e.target.value });
        this.props.fetchSearchedBrands(e.target.value);

    }

    render() {
        const { brands } = this.props;

        if (!brands) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-brand-list"
                pageCode="database">
                <Toolbar header="brand list">

                    <div className="item">
                        <div className="ui transparent icon input">
                            <input
                                type="text"
                                value={this.state.search}
                                onChange={e => this.onSearchChange(e)}
                                placeholder="Search..."

                            />
                            <i className="search link icon"></i>
                        </div>
                    </div>

                    <Link to="/brands/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                </Toolbar>
                <table className="ui celled sortable attached fluid table">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortList('name', brands.sortOrder)} className={`sorted ${brands.sortOrder}ending`}>NAME</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>

                    {brands.total > 0 &&
                        <tfoot>
                            <tr>
                                <th colSpan="2">
                                    <Pagination
                                        page={brands.page}
                                        pageSize={brands.pageSize}
                                        total={brands.total}
                                        totalPages={brands.totalPages} />
                                </th>
                            </tr>
                        </tfoot>
                    }

                </table>
            </MemberTemplate>
        );
    }
}

const mapStateToProps = state => {

    return {
        brands: state.database.listedBrands
    }
}

export default connect(mapStateToProps, { fetchBrands, fetchSortedBrands, fetchSearchedBrands })(BrandList);