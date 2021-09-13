import React from 'react';
import './menu-list-item.scss';
import {NavLink} from 'react-router-dom';

const MenuListItem = ({menuItem, onAddToCart}) => {
    
const {title, price,url,category,icon,id} = menuItem;
    return (

            <li className="menu__item">
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
                <img className="menu__icon" src={icon} alt={category}/>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}</span></div>
                <button className="menu__btn" ><NavLink className="menu__link" to={`/food/${id-1}`} params={{value:'hello'}}> Look this cart</NavLink></button>
                <button onClick={() => onAddToCart()} className="menu__btn">Add to cart</button>
            </li>
    )
}

export default MenuListItem;