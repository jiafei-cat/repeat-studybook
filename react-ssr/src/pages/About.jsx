import React from 'react'
import { fetchPersonalData } from '../store/actions/about'

const About = () => {
  return (
    <section>
      About page
    </section>
  )
}

About.getInitialData = async (store) => {
  return store.dispatch(fetchPersonalData)
}

export default About