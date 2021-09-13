import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import {Switch,Route} from 'react-router-dom';
import Background from './food-bg.jpg';
import ComponentFood from '../pages/food-page';
import "./app.css";
import {connect} from 'react-redux';
import {deleteFromCart,addedToCart} from '../../actions';

const App = (props) => {
    const {sum} = props;
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={sum}/>
            
            <Switch>
                <Route path="/menu" component={MainPage}/>
                <Route path="/total"><CartPage/></Route>
                <Route path="/food/:id" render={
                    ({match}) =>
                    {
                        return <div className="WrapFood"><ComponentFood id={match.params.id}/></div>
                    }
                        } />

                <Route path="" >
                <div style={{height: '800px'}}></div>
                </Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sum: state.dataItems.sum
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    addedToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(App);