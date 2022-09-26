import React from 'react'
import { useSelector } from 'react-redux'
import { fetchArticleListData } from '../store/actions/home'
import { Helmet } from 'react-helmet'

const Home = () => {
  const { articles } = useSelector(state => state.home)
  console.log('Home', typeof window === 'undefined')
  const handleClick = () => {
    console.log('handle click')
  }

  return (
    <>
      <Helmet>
        <title>首页</title>
      </Helmet>
      <section>
        home page
        <ul>
          {
            articles?.map(item => (
              <li key={item.id}>
                <span>title: {item.title}</span>
                &nbsp;
                <span>content: {item.content}</span>
              </li>
            ))
          }
        </ul>
        <button onClick={handleClick}>click me</button>
      </section>
    </>
  )
}

Home.getServerSideProps = async(store) => {
  return store.dispatch(fetchArticleListData)
}

export default Home