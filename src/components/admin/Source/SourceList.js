import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Pagination from '../../membership/Pagination';
import Toolbar from '../../membership/Toolbar';
import { fetchSources, fetchSortedSources, fetchSearchedSources, fetchSourcesByPage } from '../../../actions/database';


class SourceList extends React.Component {

    state = {
        search: ''
    }

    componentDidMount() {
        const { fetchSources, sources } = this.props;
        fetchSources();
        if (sources) {
            this.setState({ search: sources.search });
        }
    }

    renderList = () => {

        const { sources } = this.props;

        if (!sources) {
            return null;
        }

        if (!sources.data.length) {
            return (
                <tr>
                    <td colSpan="2">
                        No sources found.
                    </td>
                </tr>
            );
        }

        return sources.data.map(source => {
            const key = source.key;
            const editTo = `/sources/edit/${key}`;
            const deleteTo = `/sources/delete/${key}`;
            const displayTo = `/sources/display/${key}`;

            return (
                <tr key={key}>
                    <td data-label="name">{source.name}</td>
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
        this.props.fetchSortedSources(column, currentOrder === 'desc' ? 'asc' : 'desc');
    }

    onSearchChange = e => {
        this.setState({ search: e.target.value });
        this.props.fetchSearchedSources(e.target.value);
    }

    onPagination = pn => {
        const { sources, fetchSourcesByPage } = this.props;
        if (pn !== sources.page) {
            fetchSourcesByPage(pn);
        }
    }

    render() {
        const { sources } = this.props;

        if (!sources) {
            return null;
        }

        return (
            <MemberTemplate
                className="hmy-source-list"
                pageCode="database">
                <Toolbar header="source list">

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

                    <Link to="/sources/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                </Toolbar>
                <table className="ui celled sortable attached fluid table">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortList('name', sources.sortOrder)} className={`sorted ${sources.sortOrder}ending`}>NAME</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>

                    {sources.total > 0 &&
                        <tfoot>
                            <tr>
                                <th colSpan="2">
                                    <Pagination
                                        onPagination={this.onPagination}
                                        page={sources.page}
                                        pageSize={sources.pageSize}
                                        total={sources.total}
                                        totalPages={sources.totalPages} />
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
        sources: state.database.listedSources
    }
}

export default connect(mapStateToProps, { fetchSources, fetchSortedSources, fetchSearchedSources, fetchSourcesByPage })(SourceList);