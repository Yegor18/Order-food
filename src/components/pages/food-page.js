import React, {Component} from 'react';
import './menu-list-item.scss';
import {connect} from 'react-redux';
import {menuLoaded,
    menuRequested,
    menuError} from '../../actions';
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';

class ComponentFood extends Component
{
    state={
        title:null,
    }
    componentDidMount()
    {
        this.props.menuRequested();
        const {Restoreservice} = this.props;
        Restoreservice.getMenuItems()
        .then(res => this.props.menuLoaded(res))
        .catch(error => this.props.menuError());
    }

    render()
    {
        
        const {menuItems,loading,error,id} = this.props;
        if (loading)
        {
            return <Spinner/>;
        }
        else if (error) 
        {
            return <Error/>;
        }
        else
        {
            const {title,url,category,price} = menuItems[id];

            return <div className="menu__item">
             <div className="menu__title">{title}</div>
             <img className="menu__img" src={url} alt={title}></img>
             <span className={`menu__category_Img ${category}`}/>
             <div className="menu__category">Category: <span>{category}</span></div>
             <div className="menu__price">Price: <span>{price}</span></div>
             </div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems:state.menu,
        loading:state.loading,
        error:state.error
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError
}

export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(ComponentFood));