import React,{ useState} from 'react';
import classes from './Shopping.module.css';
import {useDispatch} from 'react-redux';
import { itemActions } from '../../store/item';

const ShoppingBasket=(props)=>{

    const [status,setStatus]=useState(false);
    const {amount,image,quantity,star,title,id}=props;
    const dispatch =useDispatch();
    const removeHandler=async()=>{
        setStatus(true);
        const response=await fetch(`https://clone-8e97f-default-rtdb.firebaseio.com/items/${id}.json`);

        const data=await response.json();
        const newData=Object.keys(data);
        console.log(newData);

        fetch(`https://clone-8e97f-default-rtdb.firebaseio.com/items/${id}/${newData[1]}.json`,{method:'DELETE'});

        dispatch(itemActions.removeHandler({id:id,amount:amount,quantity:quantity}));
        setStatus(false)
    }
    let starJsx=<p className={classes.star} >&#11088;</p>;
    if(star===3){
        starJsx=<><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p></>;
    }
    else if(star===4){
        starJsx=<><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p></>
    }
    else if(star===5){
        starJsx=<><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p><p className={classes.star} >&#11088;</p></>
    }

    return(
        <div className={classes.container} >
            <div className={classes.img}>
            <img src={image} alt=""  />
            </div>
            <div className={classes.info}>
                <strong>{title}</strong>
                <p>{amount}$</p>  
                <div className={classes.star}>
                {starJsx}
                </div>
                <strong>x{quantity}</strong>
                
                {!status && <button className={classes.button} onClick={removeHandler} >Remove from Basket</button>}
                {status && <p className={classes.load}>loading...</p> }
            </div>
        </div>
    );
};

export default ShoppingBasket;