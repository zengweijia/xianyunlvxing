import { Message } from 'element-ui'

export default function ({ $axios }) {
  $axios.onError((err) => {
    console.log('err222', err.response)
    const { statusCode, message } = err.response.data
    if (statusCode) {
      Message.warning(message)
    }
  })
}
