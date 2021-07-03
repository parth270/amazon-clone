import React from 'react';
import classes from './order-basket.module.css';

const ShoppingBasket=(props)=>{

    const {amount,image,quantity,star,title,id}=props;
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
            </div>
        </div>
    );
};

export default ShoppingBasket;