import React from 'react';
import classes from './Product.module.css';
import { useDispatch } from 'react-redux';
import { itemActions } from '../../store/item';

const Product =(props)=>{

    const {para,amount,star,image,style,id}=props.data;

    const dispatch = useDispatch();
    // const items=useSelector(state=>state.item.items);
    // console.log(items);
    
    const dispatchHandler=(object)=>{
        dispatch(itemActions.addHandler(object));
    }
    
    const addHandler=async()=>{
        const response=await fetch(`https://clone-8e97f-default-rtdb.firebaseio.com/items/${id}.json`,{
            method:'POST',
            body:JSON.stringify({title:para,amount:+amount,star:star,image:image,quantity:1,id:id}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data=await response.json();

        dispatchHandler({title:para,amount:+amount,star:star,image:image,quantity:1,id:id,name:data.name});
    }

    const STAR=<p>&#11088;</p>;

    let width;
    if (style==='1') {
        width='650px'
    }
    if (style==='2') {
        width='450px'
    }

    return(
        <div className={classes.container} style={style?{maxWidth:width}:{}}  >
            <div className={classes.info} >
                <p className={classes.para} >{para}</p>
                <strong className={classes.price} >{amount}$</strong>
                <div className={classes.rating} >
                    {Array(star).fill().map((_,i)=>(STAR))}
                </div>
            </div>
            <img className={classes['product-image']}  src={image} alt="" />
            <button onClick={addHandler} >Add to basket</button>
        </div>
    )
}

export default Product;