import http from "http"
import {Todolist} from "./services.mjs"

const services = new Todolist()
const server = http.createServer((request, response) => {

    let resData =  JSON.stringify({
        "code": 403,
        "message": "Bad request",
        "data": []
    })
    response.setHeader("Content-Type", "application/json")

    if (request.method == "GET") {
        services.getTodolist(request, response)
    } else if (request.method == "POST") {
        services.createTodolist(request, response)
    } else if (request.method == "PUT") {
        services.updateTodolist(request, response)
    } else if (request.method == "DELETE") {
        services.deleteTodolist(request, response)
    } else {
        response.statusCode = 403
        response.write(resData)
        response.end()
    }
})

server.listen(3000)