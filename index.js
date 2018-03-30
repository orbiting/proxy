#! /usr/bin/env node

const express = require('express')
const proxy = require('http-proxy-middleware')
const cors = require('cors')

const DEV = process.env.NODE_ENV && process.env.NODE_ENV !== 'production'
if (DEV || process.env.DOTENV) {
  require('dotenv').config()
}

const {
  PORT = '5555',
  TARGET,
  CORS_ORIGIN = 'true',
  COOKIE_DOMAIN_REWRITE = '*:localhost',
  COOKIE_STRIP_SECURE = 'true'
} = process.env

const app = express()

const parseEnv = (string, parser = identity => identity) => {
  if (string === 'true' || string === '1') {
    return true
  }
  if (string === 'false' || string === '0') {
    return false
  }
  return parser(string)
}

app.use(cors({
  origin: parseEnv(CORS_ORIGIN, string => string.split(',')),
  credentials: true
}))
app.use(
  '/',
  proxy({
    target: TARGET,
    changeOrigin: true,
    cookieDomainRewrite:
      parseEnv(COOKIE_DOMAIN_REWRITE, string =>
        string.split(',').reduce((rules, rewrite) => {
          const [source, target] = rewrite.split(':')
          rules[source] = target
          return rules
        }, {})
      ),
    onProxyRes: (proxyRes) => {
      if (parseEnv(COOKIE_STRIP_SECURE) === true) {
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie']
          .map(header => header.replace('; Secure', ''))
      }
    }
  })
)

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on port ${PORT}`)
})
