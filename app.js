const http = require('http')
const fs = require('fs')

const host = 'localhost'
const port = 9000

function readfileasync(path_to_file) {
    return new Promise((resolv, reject) => {
        fs.readFile(path_to_file, (err, data) => {
            if (!err) {
                resolv(data)
            }
            else {
                reject(err)
            }
        })
    })
}

const server = http.createServer(async (request, response) => {

    switch (request.url) {
        case "/":
        case "/index.html":
            try {
                const data = await readfileasync(__dirname + '/index.html')
                response.setHeader("Content-Type", "text/html");
                response.writeHead(200);
                response.end(data);
            }
            catch (err) {
                response.writeHead(500);
                response.end(err);
                return;
            }
            default:
                response.writeHead(200);
                response.end(`<h1> your url :<br /> ${request.url}</h1>`);
                break;
    }
})

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})