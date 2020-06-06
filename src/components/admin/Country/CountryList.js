import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';
import { fetchCountries } from '../../../actions/database';


class CountryList extends React.Component {

    componentDidMount() {
        this.props.fetchCountries();
    }

    renderList = () => {
        const { countries } = this.props;

        if (!countries) {
            return null;
        }

        return Object.keys(countries).map(item => {
            const country = countries[item];
            const editTo = `/countries/edit/${item}`;
            const deleteTo = `/countries/delete/${item}`;
            const displayTo = `/countries/display/${item}`;
            const flagClass = `${country.code} flag`;

            return (
                <tr key={item}>
                    <td className="collapsing"><i className={flagClass} /></td>
                    <td className="collapsing center aligned" data-label="code">{country.code}</td>
                    <td data-label="name">{country.name}</td>

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
                className="hmy-country-list"
                pageCode="database">

                <Toolbar header="country list">
                    <Link to="/countries/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                </Toolbar>

                <table className="ui celled attached fluid table">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="center aligned" >CODE</th>
                            <th>NAME</th>
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
        countries: state.database.countries
    }
}

export default connect(mapStateToProps, { fetchCountries })(CountryList);