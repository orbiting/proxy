# Yet Another Proxy

A development tool to proxy a secure production API to localhost.

By default this rewrites all cookies to localhost, removes secure cookie flags and allows cors.

For example to make api.republik.ch available on localhost:5555 run:
```
npm i yaproxy -g
TARGET=https://api.republik.ch yaproxy
```

Specify one or more explicit allowed cors origins:
```
CORS_ORIGIN=http://localhost:3010,http://localhost:3003 TARGET=https://api.republik.ch yaproxy
```

## Config

```
PORT=5555
# base url
TARGET
# true/false or comma-separated allowed cors origins
CORS_ORIGIN=true
# false or comma-separated source:target
COOKIE_DOMAIN_REWRITE=*:localhost
# true/false
COOKIE_STRIP_SECURE=true
```

## Deploy

The repository contains a `app.json` manifesto and can easily be deployed. Don't be evil.

- [Deploy to Heroku](https://heroku.com/deploy)
