import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberTemplate from '../../membership/MemberTemplate';
import Toolbar from '../../membership/Toolbar';
import { fetchShapes } from '../../../actions/database';


class ShapeList extends React.Component {

    componentDidMount() {
        this.props.fetchShapes();
    }

    renderList = () => {
        const { shapes } = this.props;

        if (!shapes) {
            return null;
        }

        return Object.keys(shapes).map(item => {
            const shape = shapes[item];
            const editTo = `/shapes/edit/${item}`;
            const deleteTo = `/shapes/delete/${item}`;
            const displayTo = `/shapes/display/${item}`;
           

            return (
                <tr key={item}>
                    
                    <td data-label="name">{shape.name}</td>

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
                className="hmy-shape-list"
                pageCode="database">

                <Toolbar header="shape list">
                    <Link to="/shapes/new" className="item">
                        <i className="plus blue icon" />
                    </Link>
                </Toolbar>

                <table className="ui celled attached fluid table">
                    <thead>
                        <tr>
                           
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
        shapes: state.database.shapes
    }
}

export default connect(mapStateToProps, { fetchShapes })(ShapeList);