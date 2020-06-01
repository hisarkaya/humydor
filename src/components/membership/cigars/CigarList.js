import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../MemberTemplate';
import Toolbar from '../Toolbar';

import { fetchCigars } from '../../../actions/cigar';

class CigarList extends React.Component {

    componentDidMount() {
        this.props.fetchCigars();
    }

    renderList = () => {
        const { cigars } = this.props;

        if (!cigars) {
            return null;
        }

        return Object.keys(cigars).map(item => {
            const cigar = cigars[item];
            const editTo = `/cigars/edit/${item}`;
            const deleteTo = `/cigars/delete/${item}`;
            const displayTo = `/cigars/display/${item}`;
            const flagClass = `${cigar.country.code} flag`;
            
            return (
                <tr key={item}>
                    <td className="collapsing"><i className={flagClass} /></td>
                    <td data-label="title">{`${cigar.brand.name} ${cigar.name}`}</td>
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
                className="hmy-cigar-list"
                pageCode="cigars"
                pageTitle="cigars">

                    <Toolbar>
                        <Link to="/cigars/new" className="ui labeled icon button">
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

const mapStateToProps = (state) => {
    return {
        cigars: state.cigars
    }
}

export default connect(mapStateToProps, { fetchCigars })(CigarList);
