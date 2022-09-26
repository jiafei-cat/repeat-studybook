import React from 'react'
import { useSelector } from 'react-redux'
import { fetchPersonalData } from '../store/actions/about'
import { Helmet } from 'react-helmet'

const About = () => {
  const { userInfo } = useSelector(state => state.about)
  console.log('About', typeof window === 'undefined')
  return (
    <>
      <Helmet>
        <title>关于页</title>
      </Helmet>

      <section>
        About page
        <ul>
          <li>name: {userInfo?.name}</li>
          <li>job: {userInfo?.job}</li>
        </ul>
      </section>
    </>
  )
}

About.getServerSideProps = async (store) => {
  return store.dispatch(fetchPersonalData)
}

export default About