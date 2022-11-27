export class Todolist {

    todolist = []

    mapDataTodolist() {
        return this.todolist.map((value, index) => {
            return {
                "id": index,
                "todo": value
            }
        })
    }

    getTodolist(request, response) {
        const json = JSON.stringify({
            "code": 200,
            "message": "Success",
            "data": this.mapDataTodolist()
        })

        response.statusCode = 200
        response.write(json)
        response.end()
    }

    createTodolist(request, response) {
        let json = JSON.stringify({
            "code": 403,
            "message": "Bad request"
        })

        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString())

            if (body.todo) {
                this.todolist.push(body.todo)

                json = JSON.stringify({
                    "code": 200,
                    "message": "Success",
                    "data": {
                        "id": this.todolist.length - 1,
                        "todo": body.todo
                    }
                })
                
                response.statusCode = 200
                response.write(json)
                response.end()
            } else {
                response.statusCode = 403
                response.write(json)
                response.end()
            }
        })
    }

    updateTodolist(request, response) {
        let json = JSON.stringify({
            "code": 403,
            "message": "Bad request"
        })

        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString())

            if ((body.id || body.id == 0) && body.todo) {
                if (this.todolist[body.id]) {
                    this.todolist[body.id] = body.todo
    
                    json = JSON.stringify({
                        "code": 200,
                        "message": "Success",
                        "data": {
                            "id": body.id,
                            "todo": body.todo
                        }
                    })
                    
                    response.statusCode = 200
                    response.write(json)
                    response.end()
                } else {
                    let json = JSON.stringify({
                        "code": 404,
                        "message": "Not Found"
                    })

                    response.statusCode = 404
                    response.write(json)
                    response.end()
                }
            } else {
                response.statusCode = 403
                response.write(json)
                response.end()
            }
        })
    }

    deleteTodolist(request, response) {
        let json = JSON.stringify({
            "code": 403,
            "message": "Bad request"
        })

        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString())

            if (body.id || body.id == 0) {
                if (this.todolist[body.id]) {
                    this.todolist.splice(body.id, 1)
    
                    json = JSON.stringify({
                        "code": 200,
                        "message": "Success",
                        "data": []
                    })
                    
                    response.statusCode = 200
                    response.write(json)
                    response.end()
                } else {
                    let json = JSON.stringify({
                        "code": 404,
                        "message": "Not Found"
                    })

                    response.statusCode = 404
                    response.write(json)
                    response.end()
                }
            } else {
                response.statusCode = 403
                response.write(json)
                response.end()
            }
        })
    }
}