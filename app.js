const http = require('http')
const url = require("url")
const port = 3000

let dictionary = []
let count = 0

class Word {
    constructor (word, definition) {
        this.word = word
        this.word_def = definition
    }
}

http.createServer((req, res) => {
    let q = url.parse(req.url, true)

    if (q.pathname == "/api/definitions/") {

        if (req.method === "GET" && q.query["word"]) {
            count = count + 1

            let word = q.query["word"]
            let word_object = dictionary.find(key => key["word"] === word)

            if (!word_object) {
                res.writeHead(404, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.write(`<p>Warning! ${word} does not exist.</p>`)
                res.end()
            } else {
                let word_def = word_object["word_def"]

                res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.write(`
                    <p>Request # ${count}</p><br>
                    <p>Word found:<br>
                    <p>${word}: ${word_def}</p>
                `)
                res.end()
            }            
        }
        
        if (req.method === "POST" && q.query["definition"]) {
            count = count + 1

            let word = q.query["word"]
            let word_def = q.query["definition"]

            let word_object = dictionary.find(key => key["word"] === word)
            if (word_object) {
                res.writeHead(404, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.write(`<p>Warning! ${word} already exists.</p>`)
                res.end()
            } else {
                let new_word = new Word(word, word_def)
                dictionary.push(new_word)

                res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.write(`
                    <p>Request # ${count}</p><br>
                    <p>New entry recorded:<br> 
                    <p>${word}: ${word_def}</p>
                `)
                res.end()
            }
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
        res.write(`<h3>Starting Page</h3>`)
        res.end()
    }

    // let word = q.query["word"]
    // let word_def = q.query["definition"]
    // console.log("got word and definition")

    // let new_word = new Word(word, word_def)
    // dict.push(new_word)
    // console.log("pushed into dict")
    // console.log(dict)

    // let word_is_here = dict.find(key => key["word"] === word)
    // console.log("here is word")
    // console.log(word_is_here)

    // console.log(word_is_here["word_def"])

}).listen(port)

console.log("Server is running and listening on port: " + port)