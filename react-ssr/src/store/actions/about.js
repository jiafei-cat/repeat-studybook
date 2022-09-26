import { FETCH_ABOUT_DATA } from '../consts'

export const fetchPersonalData = async (dispatch) => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userInfo: {
          name: 'garfield',
          job: '前端工程师',
        },
      })
    }, 2000)
  })

  dispatch({
    type: FETCH_ABOUT_DATA,
    payload: data,
  })
}