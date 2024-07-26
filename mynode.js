const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: 'src/.env' });

const envFileProd = `export const environment = {
    production: true,
    API_ENDPOINT: '${process.env.API_ENDPOINT}',
    ALPACA_KEY: '${process.env.ALPACA_KEY}',
    ALPACA_SECRET: '${process.env.ALPACA_SECRET}',
};
`;

const envFileDev = `export const environment = {
    production: false,
    API_ENDPOINT: 'http://localhost:8080/api/v1',
    ALPACA_KEY: '${process.env.ALPACA_KEY}',
    ALPACA_SECRET: '${process.env.ALPACA_SECRET}',
};
`;

const targetPathProd = path.join(__dirname, './src/environments/environment.production.ts');
const targetPathDev = path.join(__dirname, './src/environments/environment.ts');

fs.writeFile(targetPathProd, envFileProd, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.production.ts`);
    }
});

fs.writeFile(targetPathDev, envFileDev, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.ts`);
    }
});
