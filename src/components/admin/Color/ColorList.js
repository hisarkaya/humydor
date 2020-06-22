import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';
import { fetchColors } from '../../../actions/database';


class ColorList extends React.Component {

    componentDidMount() {
        this.props.fetchColors();
    }

    renderList = () => {
        const { colors } = this.props;

        if (!colors) {
            return null;
        }

        return Object.keys(colors).map(item => {
            const color = colors[item];
            const editTo = `/colors/edit/${item}`;
            const deleteTo = `/colors/delete/${item}`;
            const displayTo = `/colors/display/${item}`;

            return (
                <tr key={item}>
                    <td className="collapsing center aligned" data-label="code" style={{backgroundColor:`${color.code}`}}></td>
                    <td data-label="name">{color.name}</td>

                    <td className="center aligned collapsing" data-label="order">{color.order}</td>

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
                className="hmy-color-list"
                pageCode="database">

                <Toolbar header="color list">
                    <Link to="/colors/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                </Toolbar>

                <table className="ui celled attached fluid table">
                    <thead>
                        <tr>
                            <th className="center aligned">COLOR</th>
                            <th>NAME</th>
                            <th>ORDER</th>
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
        colors: state.database.colors
    }
}

export default connect(mapStateToProps, { fetchColors })(ColorList);