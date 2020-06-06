import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchBrandsByPage } from '../../actions/database';

class Pagination extends React.Component {

    onPageClick = pn => {

        const { page } = this.props;

        if (pn !== page) {
            this.props.fetchBrandsByPage(pn);
        }
        
    }

    renderLinks = () => {
        const { page, totalPages } = this.props;

        return _.range(1, totalPages + 1).map(item => {
            return <a 
                    href={`#page${item}`} 
                    key={item} 
                    className={`${ page === item ? 'active' : '' } item`} 
                    onClick={() => this.onPageClick(item)}>
                    {item}
                </a>
        });
    }

    render() {
        return (
            <div className="ui right floated pagination menu">
                {this.renderLinks()}
            </div>
        );
    }
}

export default connect(null, { fetchBrandsByPage })(Pagination);