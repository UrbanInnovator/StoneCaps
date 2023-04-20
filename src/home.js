// Home | About Us Page
import React from "react";
import './css/home.css';

const Home = () => {
  return(
    <>
      <div id='homediv' className="bg-container">
        <div id="foundersquote" className="bg-text">
          <p>"It's a HARD life being a ROCK"</p>
          <p>Co-Founders Dwayne "The Rock" Johnson & Rockey Balboa</p>
        </div>
        <div className='twobox'>
          <p id='story' className="blurbs">Made it out the mud. Been living the hard life since 
          we were pebbles. Love all our rocks and want them to shine, fresh out the mud.</p>
          <p id='statement' className='blurbs'>Making sure all my rocks, pebbles, and stones
          stay shining & dripping</p>
        </div>
      </div>
    </>
  )
}

export default Home;