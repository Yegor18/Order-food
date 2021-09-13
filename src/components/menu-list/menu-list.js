import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuError, menuLoaded,menuRequested,addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';
import './menu-list.scss';


import pizza from './pizza.png';
import salad from './salad.png';
import meat from './meat.png';

function MenuList(props) {

        const {menuItems,loading,error, addedToCart} = props;
        
        if (loading ) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        return (
            <ul className="menu__list">
                {
            menuItems.map(menuItem => 
            <MenuListItem key={menuItem.id} menuItem={menuItem} onAddToCart={() => addedToCart(menuItem.id)}/>)
                }
            </ul>
        )
};

function Logica_menu()
{
    return class extends Component {
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
            this.props.menuItems.map(menuItem => {
                switch (menuItem.category){
                    case 'pizza':
                        menuItem.icon=pizza;
                        return menuItem;
                    case 'meat':
                        menuItem.icon=meat;
                        return menuItem;
                    case 'salads':
                        menuItem.icon=salad;
                        return menuItem;  
                    default:
                        return menuItem;
            }});
            menuLoaded(this.props.menuItems);
            return <MenuList {...this.props}/>;
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
    menuError,
    addedToCart,
}

export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(Logica_menu()));