import React, { useState, useEffect } from 'react';
import './App.css';
import bossSlam from './images/boss.gif';
import bossIdle from './images/bossIdling.gif';


const App = () => {
   const [posts, setPosts] = useState([]);
   const [bossMan, setBossMan] = useState(bossIdle);
   const [paperStyle, setPaperStyle] = useState("");
   const [screenShake, setScreenShake] = useState("");

   function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

   useEffect(() => {
      fetch('https://corporatebs-generator.sameerkumar.website/')
         .then((response) => response.json())
         .then((data) => {
            setPosts(data);
            console.log(data.phrase);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   function getQuote(){
    fetch('https://corporatebs-generator.sameerkumar.website/')
    .then((response) => response.json())
    .then((data) => {
       setPosts(data);
       console.log(data.phrase);
    })
    .catch((err) => {
       console.log(err.message);
    });
   }

   function createPaper(){
    setTimeout(()=>{
      createPaper();
    },rand(500,3000));
   }

   createPaper();
return (
  <>
  <div className="graph">
    <div className="bar"></div>
  </div>
  <div className="centerContainer">
    <div className={screenShake+" centerContainer"}>
    <p className="textBubble">I Need You to {posts.phrase}</p>
    <div className="textBubbleArrow"></div>
    </div>
    <img alt="Large boss wearing a suit" className="boss" src={bossMan}/>
    <div className="desk">
    <div onClick={()=>{
      setScreenShake("");
      setBossMan(bossSlam);
      setPaperStyle("falling");
        setTimeout(()=>{
            setScreenShake("screenShake");
            getQuote();
            setBossMan(bossIdle);
            setPaperStyle("");
        },2000);}}
          className={paperStyle + " paper"}>
      <div className="line"></div>
      <div className="lineSmaller"></div>
      <div className="line"></div>
      <div className="lineSmaller"></div>
      <div className="lineSmaller"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
      {/* <p className="rightArrow" style={{left:paperStyle+10+"%"}}>&rarr;</p> */}
      <div className="paperBasket"></div>
    </div>
  </div>
  </>
);
};

export default App;

