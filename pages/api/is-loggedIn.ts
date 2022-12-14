import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('first', process.env.ALLOWED_ORGINS)
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.ALLOWED_ORGINS || 'http://localhost:3000/'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    // if (req.method == 'OPTIONS') {
    //   res.setHeader(
    //     'Access-Control-Allow-Methods',
    //     'PUT, POST, PATCH, DELETE, GET'
    //   )
    const { cookies } = req
    const api_token = cookies.user

    if (api_token) {
      // okay
      res.status(201).json('authenticated')
    } else {
      // unauthorized
      res.status(403).json(null)
    }
    // } else {
    //   res.status(403).json('not allowed method')
    // }
  } catch (error) {
    res.statusCode = 500
    console.log('oops error -', error)
  }
}
