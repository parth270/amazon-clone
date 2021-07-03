import React from "react";
import classes from "./Home.module.css";
import Product from "../Product/Product";

const DUMMY = [
  {
    para: "The Lean Startup: How Constant Innovation Creates Radically Succesful Businesses paperback",
    amount: "19.99",
    star: 5,
    image: "https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg",
    id:1,
    style:'1'

  },
  {
    para: "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with k-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
    amount: "239.99",
    star: 4,
    image: "https://images-na.ssl-images-amazon.com/images/I/51ae8jtSakL._SX425_.jpg",
    id:2,
    style:'1'

  },
  {
    para: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",
    amount: "190.99",
    star: 3,
    image: "https://images-na.ssl-images-amazon.com/images/I/71YXi8AAJeL._SL1500_.jpg",
    id:3,
    style:'2'

  },
  {
    para: "Amazon Echo (3rd generation) Smart speaker with Alexa, Charcoal Fabric",
    amount: "99.99",
    star: 4,
    image: "https://www.mytrendyphone.eu/images/Amazon-Echo-Dot-3-Smart-Speaker-with-Alexa-and-Alarm-Clock-Black-0841667160306-17112020-01-p.jpg",
    id:4,
    style:'2'

  },
  {
    para: "New Apple iPad pro (12.9-inch,Wi-Fi, 128gb) -Silver (4th Generation) ",
    amount: "598.99",
    star: 4,
    image: "https://www.apple.com/newsroom/images/tile-images/Apple_new-ipad-pro_03182020.jpg.landing-big_2x.jpg",
    id:5,
    style:'2'
  },
  {
    para: "Smasung Lc45866S15852S58 49' LED Gaming Monitor - Super Ultra Mode Dual WQHD 5120 x 1440",
    amount: "1094.99",
    star: 4,
    image: "https://images.samsung.com/is/image/samsung/my-c49hg90-lc49hg90dmexxm-frontblack-78391809?$LazyLoad_Home_IMG$",
    id:6,
    style:''
  }
];

const Home = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes["home-container"]}>
        <img
          className={classes["home-image"]}
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220-.jpg"
          alt=""
        />
        <div className={classes["first-row"]}>
          <Product  data={DUMMY[0]}  refresh={props.refresh} />
          <Product data={DUMMY[1]}  refresh={props.refresh}  />
        </div>
        <div className={classes["second-row"]}>
          <Product data={DUMMY[2]} refresh={props.refresh} />
          <Product data={DUMMY[3]} refresh={props.refresh} />
          <Product data={DUMMY[4]} refresh={props.refresh} />
        </div>
        <div className={classes["third-row"]}>
        <Product data={DUMMY[5]} refresh={props.refresh} />    
        </div>
      </div>
    </div>
  );
};

export default Home;
