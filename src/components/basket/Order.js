import React, { useEffect } from 'react';
import { useState } from 'react';
import classes from './Order.module.css';
import ShoppingBasket from './order-product';

const Order=()=>{

    const [orders,setOrders]=useState([]);
    console.log(orders);

    useEffect(()=>{
        const fetchHandler=async()=>{
            const response =await fetch('https://clone-db194-default-rtdb.firebaseio.com/orders.json');
            const data=await response.json();
            const newData=Object.values(data);
            setOrders(newData);
        }
        fetchHandler();
    },[])
    return(
        <div className={classes.orders} >
            <h2 className="center" >Your Current Order</h2>
            {orders.map((item) => (
              <ShoppingBasket
                amount={item.amount}
                key={item.id}
                image={item.image}
                quantity={item.quantity}
                title={item.title}
                star={item.star}
                id={item.id}
              />
            ))}
            <p className={classes.details} ></p>
        </div>
    )
}

export default Order;
