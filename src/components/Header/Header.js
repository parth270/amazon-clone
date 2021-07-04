import React, { useState } from "react";
import classes from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Backdrop from '../UI/Backdrop';
/*<Backdrop>
        <div className='loading-container' >
        <img src="https://www.freeiconspng.com/uploads/load-icon-png-27.png" className="loading"/>
        <p>loading...</p>
        </div>
      </Backdrop>*/

const Header = () => {
  const [backdrop, setBackdrop] = useState(false);
  const history = useHistory();
  const quantity = useSelector((state) => state.item.totalQuantity);
  const userName = localStorage.getItem("email");
  const status = localStorage.getItem("status");
  const dispatch = useDispatch();

  const homeHandler = () => {
    history.replace("/");
  };
  const loginHandler = () => {
    if (!status) {
      history.replace("/login");
    } else {
      setBackdrop(true);
    }
  };
  const logoutHandler = () => {
    localStorage.clear();
    fetch('https://clone-db194-default-rtdb.firebaseio.com/orders.json',{method:'DELETE'});
    fetch('https://clone-db194-default-rtdb.firebaseio.com/total.json',{method:'DELETE'});
    dispatch(authActions.logoutHandler());
    setBackdrop(false);
    history.go();
  };
  const basketHandler = () => {
    if (!status) {
      history.replace("/login");
    } else {
      history.replace("/basket");
    }
  };

  const cancelHandler = () => {
    setBackdrop(false);
  };

  return (
    <React.Fragment>
      {backdrop && (
        <Backdrop>
          <div className={classes["error-container"]}>
            <h2>sign out?</h2>
            <div className={classes["button-container"]}>
              <button className={classes["sign-out"]} onClick={logoutHandler}>
                Yes
              </button>
              <button className={classes["cancel"]} onClick={cancelHandler}>
                no
              </button>
            </div>
          </div>
        </Backdrop>
      )}

      <nav className={classes.nav}>
        <ul>
          <li className={classes["amazon-logo"]} onClick={homeHandler}>
            <img
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </li>
          <li className={classes.search}>
            <input type="search" name="" id="" />
            <SearchIcon className={classes["search-icon"]} />
          </li>
          <li className={classes["header-nav"]}>
            <div className={classes["sign-in"]} onClick={loginHandler}>
              <span className={classes.up}>Hello</span>
              <span className={classes.down}>
                {status ? userName : "Sign in"}
              </span>
            </div>
            {/* {status && <div className={classes.sign}  onClick={logoutHandler} >
            <span className={classes.up}>good to see you</span>
            <span className={classes.down}>Sign out</span>
          </div>} */}
            <div className={classes.returns}  >
              <span className={classes.up}>Returns</span>
              <span className={classes.down}>& Orders</span>
            </div>
            <div className={classes["your-prime"]}>
              <span className={classes.up}>Your</span>
              <span className={classes.down}>Prime</span>
            </div>
            <div className={classes.basket} onClick={basketHandler}>
              <ShoppingBasketIcon />
              <span className={classes["item-quantity"]}>{quantity}</span>
            </div>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
