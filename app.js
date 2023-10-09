const http = require('http')
const url = require("url")
const port = 3000

let dictionary = []
let count = 0

// word class to put into dictionary
class Word {
    constructor (word, definition) {
        this.word = word
        this.word_def = definition
    }
}

http.createServer((req, res) => {
    let q = url.parse(req.url, true)

    // checks if the pathname matches the requirements 
    if (q.pathname == "/api/definitions/") {

        // if the method is a GET and there is the right API requirements 
        if (req.method === "GET" && q.query["word"]) {
            count = count + 1

            let word = q.query["word"]
            let word_object = dictionary.find(key => key["word"] === word)

            // WORD object is not found
            if (!word_object) {
                res.writeHead(400, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.end(JSON.stringify({response: `Request # ${count}`, error: `${word} is not found`}))
            } else { // WORD object is found
                res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.end(JSON.stringify({response: `Request # ${count}`, word_object}))

            }   
        }

        // } else { // if method is a GET but the API requirements are wrong
        //     res.writeHead(400, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
        //     res.write(`<h3>Wrong API requirements</h3>`)
        // }
        
        // if the method is a POST and is the right API requirements 
        if (req.method === "POST" && q.query["definition"]) {
            count = count + 1

            let word = q.query["word"]
            let word_def = q.query["definition"]

            let word_object = dictionary.find(key => key["word"] === word)

            // if the WORD object already exists
            if (word_object) {
                res.writeHead(400, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                // res.end(JSON.stringify({response: `Request # ${count}`, error: `${word} already exists`}))
                res.write("hello")
                res.end()
            } else { // WORD object doesnt exists 
                let new_word = new Word(word, word_def)
                dictionary.push(new_word)

                res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                // res.end(JSON.stringify({response: `Request # ${count}`, success: `New entry recorded:`}))
                res.write("no")
                res.end();
            }
        }

        // } else { // if the method is a POST but the API requirements are wrong
        //     res.writeHead(400, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
        //     res.write(`<h3>Wrong API requirements</h3>`)
        // }

    } else { // starting page
        res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
        res.end()
    }

}).listen(port)

console.log("Server is running and listening on port: " + port)