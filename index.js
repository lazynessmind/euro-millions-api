const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const app = express();

app.get('/', (req, res)=>{
    res.send('Server running')
})

app.get('/lastResult', (req, res) => {
    request('https://www.jogossantacasa.pt/web/SCCartazResult/', (err, result, html) => {
        const $ = cheerio.load(html)

        let dateResp =$('.dataInfo').text()
        let date = dateResp.split(' ')
        let day = date[7]

        let chaveResp = $('.colums').find('li').first().text()
        let chave = chaveResp.split('+')
        let balls = chave[0].trimRight()
        let stars = chave[1].trimLeft()

        let jackpot = $('.noLine').find('.stronger').last().text()
        let jack = jackpot.trim()

        const sendChave = {
            date: day,
            balls: balls,
            stars: stars,
            jackpot: jack
        }
        res.send(sendChave)
    })
})

app.listen(3000, () => {
    console.log("Listenning")
})