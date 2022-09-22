import React from 'react'

const Home = () => {
  const handleClick = () => {
    console.log('handle click')
  }

  return (
    <section>
      home page
      <button onClick={handleClick}>click me</button>
    </section>
  )
}

export default Home