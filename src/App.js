import { Fragment, useEffect, useCallback } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import Basket from "./components/basket/Basket";
import Footer from './components/Footer/Footer';
import Login from "./components/login/Login";
import { useDispatch } from "react-redux";
import { itemActions } from "./store/item";
import Checkout from "./components/basket/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from '@stripe/stripe-js';

const promise = loadStripe(
  "pk_test_51J8OruSAJSO5Ac0I7wRusrFqDkFlubTKFZm8B2jodKpomd0rCO6a8xp60zdwjt5XVPjjWlFORxsD9030AHV3Zcb300BiHPoXfF"
);

function App() {
  const dispatch = useDispatch();

  const sendHandler = useCallback(() => {
    dispatch(itemActions.clearHandler());

    fetch("https://clone-db194-default-rtdb.firebaseio.com/items.json")
      .then((response) => response.json())
      .then((data) => {
        const loadeditems = [];

        const newData = Object.values(data);

        for (const i in newData) {
          const newerData = Object.values(newData[i]);
          for (const key in newerData) {
            const item = {
              amount: newerData[key].amount,
              id: newerData[key].id,
              image: newerData[key].image,
              quantity: newerData[key].quantity,
              star: newerData[key].star,
              title: newerData[key].title,
            };
            loadeditems.push(item);
            dispatch(itemActions.addHandler(item));
          }
        }
      });
  }, [dispatch]);

  useEffect(() => {
    sendHandler();
  }, [sendHandler]);

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Header />
          <Home />
          <Footer/>
        </Route>
        {!localStorage.getItem("status") && (
          <Route path="/login">
            <Login />
          </Route>
        )}
        <Route path="/basket" exact>
          <Header />
          <Basket />
          <Footer/>
        </Route>
        <Route path="/basket/checkout">
          <Header />
          <Elements stripe={promise}>
            <Checkout />
          </Elements>
          <Footer/>
        </Route>
        <Route path="*">
          <div className="error-container">
            <h1>404 some error occured</h1>
            <p className="center">(some reason) </p>
          </div>
        </Route>
      </Switch>
      
    </Fragment>
  );
}

export default App;

// database:-https://clone-8e97f-default-rtdb.firebaseio.com/

