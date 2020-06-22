import React from 'react';
import _ from 'lodash';



class Pagination extends React.Component {

    onPageClick = pNo => {
        this.props.onPagination(pNo);
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
        const { total } = this.props;
        
        if( !total) {
            return null;
        }

        return (
            <div className="ui right floated pagination menu">
                {this.renderLinks()}
            </div>
        );
    }
}

export default Pagination;