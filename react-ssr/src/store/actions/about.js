import { FETCH_ABOUT_DATA } from '../consts'

export const fetchPersonalData = () => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userInfo: {
          username: 'garfield',
          job: '前端工程师',
        },
      })
    }, 2000)
  })

  dispath({
    type: FETCH_ABOUT_DATA,
    payload: data,
  })
}