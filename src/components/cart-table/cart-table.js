import React,{Component} from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../actions';
import nextId from "react-id-generator";
import WithRestoService from '../hoc/with-resto-service';

class CartTable extends Component {

    render()
    {
       const {items, deleteFromCart,Restoreservice} = this.props;
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    
                    items.map((item,index) => {
                        const {title,price, url,id,count} = item;
                        if (index === items.length -1)
                        {
                            return (
                                <div key={nextId()} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$<div className="count_food">{count}</div></div>
                                <div onClick={() => {deleteFromCart(id);this.forceUpdate()}} className="cart__close">&times;</div>
                                <button className="send__data" onClick={() =>Restoreservice.setOrders(items)}> Отправить данные</button>
                                </div>
                                    )
                        }
                        
                        return (
                    <div key={nextId()} className="cart__item">
                    <img src={url} className="cart__item-img" alt={title}></img>
                    <div className="cart__item-title">{title}</div>
                    <div className="cart__item-price">{price}$<div className="count_food">{count}</div></div>
                    <div onClick={() => {deleteFromCart(id);this.forceUpdate()}} className="cart__close">&times;</div>
                    
                    </div>
                        )
                    })
                }
                
            </div>
        </>
    );
    }
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));