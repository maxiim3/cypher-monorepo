import http from "node:http";
import url from "node:url";

const server = http.createServer();

function encrypt(data: string, key: string) {
    return  data;
}

const PORT = 5555;
const ROUTES = { index: "/", cypher: "/cypher", decypher: "/decypher" };
type ServerResponse = {
    response: string;
    type: "Node";
};

// Listen to the request event
server.on("request", (request, res) => {
    const { pathname } = url.parse(request.url!, true);

    switch (pathname) {
        case ROUTES.index: {
            console.log(`new request at ${pathname}`);
            if (request.method === "GET") {
                res.writeHead(200, { "Content-Type": "application/json", "access-control-allow-origin": "http://localhost:3000" });
                res.end(
                    JSON.stringify({
                        response: "Hello World!",
                        type: "Node",
                    } as ServerResponse),
                );
            }
            break;
        }
        case ROUTES.cypher: {
            console.log(`new request at ${pathname}`);
            if (request.method === "GET") {
                res.writeHead(200, { "Content-Type": "application/json", "access-control-allow-origin": "http://localhost:3000" });
                res.end(
                    JSON.stringify({
                        response: "use the Post method",
                        type: "Node",
                    } as ServerResponse),
                );
            } else if (request.method === "POST") {
                let body = "";
                request.on("data", (chunk: string) => {

                    body += chunk;
                });
                request.on("end", () => {
                    const { message, secret } = JSON.parse(body);

                    if (!message || !secret) {
                        res.writeHead(400, { "Content-Type": "application/json", "access-control-allow-origin": "http://localhost:3000" });
                        res.end(
                            JSON.stringify({
                                response: "If you see this, something went wrong..",
                                type: "Node",
                            } as ServerResponse),
                        );
                        return;
                    }
                    const crypted = encrypt(message, secret);
                    res.writeHead(200, { "Content-Type": "application/json", "access-control-allow-origin": "http://localhost:3000" });
                    res.end(
                        JSON.stringify({
                            response: crypted,
                            type: "Node",
                        } as ServerResponse),
                    );
                });
            }
            break;
        }
        case ROUTES.decypher: {
            console.log(`new request at ${pathname}`);
            if (request.method === "GET") {
                res.writeHead(200, { "Content-Type": "application/json", "access-control-allow-origin": "http://localhost:3000" });
                res.end(
                    JSON.stringify({
                        response: "decryting...",
                        type: "Node"
                    } as ServerResponse),
                );
            }
            break;
        }
        default: {
            res.writeHead(400, { "Content-Type": "application/json", "access-control-allow-origin": "http://localhost:3000" });
            res.end(
                JSON.stringify({
                    response: "Something went wrong",
                    type:'Node'
                } as ServerResponse),
            );
            break;
        }
    }
});

server.listen(PORT, () => {
    console.log(`listening @http://localhost:${PORT}`);
});
