import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';
import { fetchNames } from '../../../actions/database';


class NameList extends React.Component {

    componentDidMount() {
        this.props.fetchNames();
    }

    renderList = () => {
        const { names } = this.props;

        if (!names) {
            return null;
        }

        return Object.keys(names).map(item => {
            const name = names[item];
            const editTo = `/names/edit/${item}`;
            const deleteTo = `/names/delete/${item}`;
            const displayTo = `/names/display/${item}`;
            const flagClass = `${name.country.code} flag`;
            
            return (
                <tr key={item}>
                    <td className="collapsing"><i className={flagClass} /></td>
                    <td data-label="title">{`${name.brand.name} ${name.title}`}</td>
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
                className="hmy-name-list"
                pageCode="database"
                pageTitle="cigar name list">

                <Toolbar >
                    <Link to="/names/new" className="ui labeled icon button">
                        <i className="plus blue icon" />Add
                    </Link>
                </Toolbar>

                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>cigar name</th>
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
        names: state.database.names
    }
}

export default connect(mapStateToProps, { fetchNames })(NameList);