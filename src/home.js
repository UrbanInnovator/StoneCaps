// Home | About Us Page
import React from "react";
import './css/home.css';

const Home = () => {
  return(
    <div id='homediv'>
      <p className='foundersquote'>"It's a HARD life being a ROCK"</p>
      <p className='foundersquote'>Co-Founders Dwayne "The Rock" Johnson & Rockey Balboa</p>
      <div className='twobox'>
        <p className='storystate' id='story'>Made it out the mud. Been living the hard life since 
        we were pebbles. Love all our rocks and want them to shine, fresh out the mud.</p>
        <p className='storystate' id='statement'>Making sure all my rocks, pebbles, and stones
        stay shining & dripping</p>
      </div>
    </div>
  )
}

export default Home;