const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const EUROMILLIONS_URL = 'https://www.jogossantacasa.pt/web/SCCartazResult/'; 
const M1LHAO_URL = 'https://www.jogossantacasa.pt/web/SCCartazResult/m1lhao';

app.get('/', (req, res) => {
    res.send('Server running');
});

app.get('/last', (req, res) => {
    request(EUROMILLIONS_URL, (err, result, html) => {
        
        const $ = cheerio.load(html);

        let date = $('.dataInfo').text().split(' ')[7];
    
        let key = $('.colums').find('li').first().text().split('+');
        let balls = key[0].trimRight();
        let stars = key[1].trimLeft();

        let jackpot = $('.noLine').find('.stronger').last().text().trim();
        
        request(M1LHAO_URL, (err, result, html) => {
            
            const $ = cheerio.load(html);

            let code = $('#code_m1').text();
            let codeDate = $('.dataInfo').text().split(' ')[7];

            const sendKey = {
                date: date,
                balls: balls,
                stars: stars,
                jackpot: jackpot,
                milhaoCode: code,
                milhaoDate: codeDate
            };
    
            res.send(sendKey);
        });
    });
});

app.get('/euro', (req, res) => {
    request(EUROMILLIONS_URL, (err, result, html) => {
        
        const $ = cheerio.load(html);

        let date = $('.dataInfo').text().split(' ')[7];
        
        let key = $('.colums').find('li').first().text().split('+');
        let balls = key[0].trimRight();
        let stars = key[1].trimLeft();

        let jackpot = $('.noLine').find('.stronger').last().text().trim();
        
        const sendKey = {
            date: date,
            balls: balls,
            stars: stars,
            jackpot: jackpot
        };

        res.send(sendKey)
    
    });
});

app.get('/milhao', (req, res) => {
    request('https://www.jogossantacasa.pt/web/SCCartazResult/m1lhao', (err, result, html) => {
        const $ = cheerio.load(html);

        let code = $('#code_m1').text()
        let codeDate = $('.dataInfo').text().split(' ')[7];

        const getM1lhao = {
            code: code,
            code_date: codeDate
        };

        res.send(getM1lhao);
    });
});

app.listen(3000, () => {
    console.log("Listenning")
});