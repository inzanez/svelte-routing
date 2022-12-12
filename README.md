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

There are three (or rather four) things to test:

1. Run in `dev` mode and access pages
2. Run the build without a proxy
3. Run the build through a `haproxy` instance with `path rewrite`

### Case 1

`npm run dev`

* Visiting `http://localhost:5173/` redirects to `http://localhost:5173/base/path`
and serves the index page
* Visiting `http://localhost:5173/base/path/sub/welcome` does work

### Case 2

`node build`

* Visiting `http://localhost:3000/base/path` does work
* Visiting `http://localhost:3000/base/path/sub/welcome` does work

### Case 3

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

and now browse port `8888` instead of `3000`:

* Visiting `http://localhost:8888/base/path` results in `404`
* Visiting `http://localhost:3000/base/path/sub/welcome` results in `404`

**Turning off the `replace-path` instruction will make it work again.**
