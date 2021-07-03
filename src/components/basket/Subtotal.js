import React from 'react';
import classes from './Subtotal.module.css';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Subtotal=(props)=>{

    const history=useHistory();

    const data=useSelector(state=>state.item);
    const totalAmount=data.totalPrice.toFixed(2);
    const totalQuantity=data.totalQuantity;

    const proceedHandler=(event)=>{
        event.preventDefault();
        if (props.status) {
            console.log('proceeded');
            history.push('/basket/checkout');
        }
    }

    return(
        <form className={classes.container} >
            <p>Subtotal ({totalQuantity} items):<strong>${totalAmount}</strong> </p>
            <p className={classes.input} > <input type="checkbox" /> This order contains a gift </p>
            <button className={props.status?classes.button:classes.disabled}   onClick={proceedHandler} >Proceed to Checkout</button>
        </form>
    )
}

export default Subtotal;