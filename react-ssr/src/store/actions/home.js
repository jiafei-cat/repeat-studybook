import { FETCH_HOME_DATA } from '../consts'

export const fetchArticleListData = async (dispatch) => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        articles: [{
          id: 1,
          title: 'test 1',
          content: 'test 11',
        }, {
          id: 2,
          title: 'test 2',
          content: 'test 22',
        }]
      })
    }, 2000)
  })

  dispatch({
    type: FETCH_HOME_DATA,
    payload: data,
  })
}