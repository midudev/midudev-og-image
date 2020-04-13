import polka from 'polka'
import getOgImage from '../../api/get.js'

polka()
  .get('*', getOgImage)
  .listen(3001, err => {
    if (err) throw err
    console.log('> Running API on localhost:3001')
  })
