const http = require('http')
const url = require("url")
const port = 3000

let definitions = []

http.createServer((req, res) => {
    let q = url.parse(req.url, true)

    console.log(q.pathname)

    if (q.pathname == "/api/definitions/") {

        if (req.method === "OPTIONS") {
            res.setHeader
        }



        if (req.method === "GET" && q.query["name"]) {
            let word = q.query["name"]
            let word_def = ""

            for (let i = 0; i < definitions.length(); i++) {
                word_def = definitions[i].find(key => definitions[i][key] === word)
            }

            res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})

        }
        
        if (req.method === "POST" && q.query["definition"]) {
            let word = q.query["name"]
            let word_def = q.query["definition"]

            let combo = {word: word_def}

            definitions.push(combo)

            res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
            res.write(`<h3>You have added ${word} to the dictionry</h3>`)
            res.end()
        } 

    }











    res.writeHead(200, {'Content-Type': 'text', 'Access-Control-Allow-Origin': '*'})
    res.write(`<p style="color: blue;">Hello ${q.query["name"]}. What a beautiful day. Server current date and time is friday yo</p>`)
    res.end()
}).listen(port)

console.log("Server is running and listening on port: " + port)