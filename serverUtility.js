const http = require('http');
const port = 8000;
let dataStorage = [{
    'id': 1,
    'name': 'learn HTTP',
    'isComplete': false
}, {
    'id': 2,
    'name': 'Eat food',
    'isComplete': false
}];
let id = 3;
const server = http.createServer((request, response) => {
    // console.log(request);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    if (request.method == 'GET') {
        const params = request.url.split('/');
        if (request.url == '/tasks/') {
            response.write(JSON.stringify(dataStorage));
        } else if (params.length == 3) {
            response.write(JSON.stringify(dataStorage.filter(iterator => Number(params[2]) == iterator.id)));
        }
    }
    else if (request.method == 'POST') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(JSON.parse(chunk));
        }).on('end', () => {
            body = createTask(body[0]);
            dataStorage.push(body);
        });
    }
    else if (request.method == 'PUT') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(JSON.parse(chunk));
        }).on('end', () => {
            let id = body[0].id;
            dataStorage.map((iterator, index) => {
                if (iterator.id == id) {
                    taskComplete(iterator, index);
                }
            });
        });

    } else if (request.method == 'PATCH') {
        deleteTaskIsComplete();
    }
    else {
        let body = [];
        request.on('data', (chunk) => {
            body.push(JSON.parse(chunk));
        }).on('end', () => {
            let id = body[0].id;
            deleteTask(id);
        });
    }

    response.end();
});
server.listen(port);

const createTask = (input) => {
    input.id = id;
    id++;
    input.isComplete = false;
    return input;
};

const taskComplete = (jsonObject, index) => {
    jsonObject.isComplete = true;
    dataStorage[index] = jsonObject;
};


const deleteTask = (idToBeDeleted) => {
    dataStorage = dataStorage.reduce((accumulator, iterator) => {
        if (iterator.id != idToBeDeleted) {
            accumulator.push(iterator);
        }
        return accumulator;
    }, []);
};
const deleteTaskIsComplete = () => {
    dataStorage = dataStorage.reduce((accumulator, iterator) => {
        if (iterator.isComplete != true) {
            accumulator.push(iterator);
        }
        return accumulator;
    }, []);
};
