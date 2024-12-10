import HeaderBox from '@/components/ui/HeaderBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName : 'Navin'};
  return (
   <section className='home'>
    <div className='home-content'>
      <header className='home-header'>
       <HeaderBox
       type= "greeting"
       title="Welcome"
       user={loggedIn?.firstName || 'Guest'}
       subtext = "Access and manage your account and transactions efficiently."
       />
      </header>
    </div>
   </section>
  )
}

export default Home