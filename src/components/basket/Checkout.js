import React from "react";
import classes from "./Checkout.module.css";
import ShoppingBasket from "../Product/Shopping-product";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "./axios";

const Checkout = () => {
  const items = useSelector((state) => state.item.items);
  const total = useSelector((state) => state.item.totalPrice);
  const history = useHistory();
  console.log(items);

   if (items.length === 0) {
     history.replace("/");
   }
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const [clientSecret, setSecret] = useState('');

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });
      setSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [total]);

  console.log('THE SECRET IS >>>>',clientSecret);

  const orderHandler=()=>{
    
     for(const keys in items){
       fetch(`https://clone-8e97f-default-rtdb.firebaseio.com/orders.json`,{
        method:'POST',
        body:JSON.stringify({amount:items[keys].amount,id:items[keys].id,image:items[keys].image,quantity:items[keys].quantity,star:items[keys].star,title:items[keys].title}),
       }).then()
     }
     fetch('https://clone-8e97f-default-rtdb.firebaseio.com/total.json',{method:'POST',body:JSON.stringify(total)})
   }

  const submitHandler = async (event) => {
    event.preventDefault();
    setProcessing(true);

     const payload = await stripe.confirmCardPayment(clientSecret, {
         payment_method:{card: element.getElement(CardElement),}
       })
       .then(({ paymentIntent }) => {
          orderHandler();
           setSucceeded(true);
           setError(null);
           setProcessing(false);
           history.replace('/orders');
   });
  };

  const changeHandler = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const stripe = useStripe();
  const element = useElements();

  return (
    <React.Fragment>
      <div className={classes.payment}>
        <h1>Checkout</h1>
        <div className={classes["payment-container"]}>
          <div className={classes["payment-section"]}>
            <div className={classes["payment-title"]}>
              <h3>Delivery address</h3>
            </div>
            <div className={classes.address}>
              <p>{localStorage.getItem("email")}</p>
              <p>wz-4855,Tilak Nagar</p>
              <p>Delhi,India</p>
            </div>
          </div>
          <div className={classes["payment-section"]}>
            <div className={classes["items-title"]}>
              <h3>Review items and delivery</h3>
            </div>
            <div className={classes["payment-items"]}>
              {items.length !== 0 &&
                items.map((item) => (
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
            {/* reviiew-items */}
          </div>
          <div className={classes["payment-section"]}>
            <div className={classes["payment-title"]}>
              <h3>Payment Method</h3>
            </div>
            <div className={classes["payment-details"]}>
              <form onSubmit={submitHandler}>
                <CardElement onChange={changeHandler} />
                <div className={classes["payment-price-container"]}>
                  Order Total: ${total.toFixed(2)}
                </div>
                <button disabled={processing || disabled || succeeded} className={classes['checkout-button']} >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
