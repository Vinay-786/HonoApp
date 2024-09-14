# Expense app

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```
_Note: you need to run that command in both server and frontend directories for it to work

## Deploy

This app can be easily deployed on ony simple vps.

You can deploy frontend and backend on separate edge runtimes. just add right proxy of your backend to the frontend.

```javascript
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
```
