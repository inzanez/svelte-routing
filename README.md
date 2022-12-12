# Svelte Routing Issues / Questions (OLD VERSION)

## What and how to reproduce

Clone, install packages and build the project:

```
git clone https://github.com/inzanez/svelte-routing
cd svelte-routing
yarn install
yarn run build
```

The project just has two routes:

1. `/`
2. `/sub/welcome`

In `svelte.config.js`, the `paths.base` is set to `/base/path`.

There are three things to test:

1. Run in `dev` mode and access pages
2. Run the build without a proxy
3. Run the build through a `haproxy` instance with `path rewrite`

### Case 1

`npm run dev`

* Visiting `http://localhost:3000/` will result in a `404 not found`.
I would assume that this is because of the `paths.base`
* Visiting `http://localhost:3000/base/path` does work
* Visiting `http://localhost:3000/base/path/sub/welcome` does work

### Case 2

`node build`

* Visiting `http://localhost:3000/` does return the main document, but gets
many `404` for static assets (javascript and css content). This is because
these URLs got the `paths.base` prepended but it seems that they are still
just served from the root `/`
* Visiting `http://localhost:3000/base/path` does `404`
* Visiting `http://localhost:3000/base/path/sub/welcome` does `404`

### Case 3

From the two above I gather that things are served from `/` but the `paths.base`
gets prepended to static assets. Therefore using the following `haproxy` config
should work:

```
global
  user haproxy
  group haproxy

defaults
  mode http

frontend proxy
  bind *:8888

  default_backend servers

backend servers
  http-request replace-path /base/path/(.*) /\1
  server server1 127.0.0.1:3000
```

Again, start the node server:

`node build`

and now browse port `8888` instead of `3000` (please be aware that the `/`
should not be browsed with this rev-proxy config, I am aware of the loop):

* Visiting `http://localhost:8888/base/path` does work perfectly
* Visiting `http://localhost:3000/base/path/sub/welcome` does work perfectly

