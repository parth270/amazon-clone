import React from "react";
import classes from "./Basket.module.css";
import Subtotal from "./Subtotal";
import ShoppingBasket from "../Product/Shopping-product";
import { useSelector } from "react-redux";

const Basket = (props) => {
  const items = useSelector((state) => state.item.items);


  return (
    <div className={classes["big-container"]}>
      <div className={classes.img}>
        <img
          className={classes.ad}
          src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/CCMP/newstorefront/YACC-desktop-nonprime-banner3.png"
          alt=""
        />
      </div>
      <div className={classes.container}>
        <div className={classes["left-container"]}>
          <div className={classes["shopping-basket"]}>
            <h2>Your shopping basket {items.length===0 && 'is empty'} </h2>
          </div>
          <div className={classes["products"]}>
            {items.length===0?<p className={classes.error} >Please add something to your basket</p>: items.map((item) => (
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
          </div>
        </div>
        <div className={classes["right-container"]}>
          <h2>Proceed:</h2>
          <Subtotal  status={items.length} />
        </div>
      </div>
    </div>
  );
};

export default Basket;
