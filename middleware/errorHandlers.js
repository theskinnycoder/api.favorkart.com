import { IS_DEV } from '../utils/constants.js'

export function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  error.stack = null
  res.status(404)
  next(error)
}

export function errorHandler(err, _req, res, _next) {
  let error = err.message
  console.log(err.message)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    error,
    stack: !IS_DEV ? null : err.stack,
  })
}
