# GAN Integrity backend code challenge

The script `index.js` uses a local api to perform various operations on a set of cities. Your task is to implement an api so that the script runs successfully all the way to the end.

Run `npm install` and `npm run start` to start the script.

Your api can load the required data from [here](addresses.json).

In the distance calculations you can assume the earth is a perfect sphere and has a radius is 6371 km.

Once you are done, please provide us with a link to a git repo with your code, ready to run.

## API

### Packages used

- [dotenv-flow](https://www.npmjs.com/package/dotenv-flow)
- [envalid](https://www.npmjs.com/package/envalid)
- [http-status-codes](https://www.npmjs.com/package/http-status-codes)
- [zod](https://www.npmjs.com/package/zod)

### Running the project

Create .env file in the root folder if not present.

``` env
protocol=http
host=127.0.0.1
port=8080
```

In root directory run

`npm run start:api`

For development run

`npm run dev`

Running the index script

`npm run start`
