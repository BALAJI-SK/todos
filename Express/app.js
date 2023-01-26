const express = require('express');
const bodyParser = require('body-parser');
app.use(express.json());
const app = express();
const port = 8000;
let dataStorage = [{
    'id': 1,
    'name': 'learn HTTP module',
    'isComplete': false
}, {
    'id': 2,
    'name': 'Eat food',
    'isComplete': false
}];
let id = 3;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/tasks', (request, response) => {
    response.json(dataStorage);
});

app.get('/tasks/id/:id', (request, response) => {
    let task = dataStorage.filter(
        iterator => Number(request.params.id) == iterator.id);
    if (task.length == 0) {
        return response.statusCode(400).send('Given id not exist!!');
    }
    response.json(

    );

});
app.post('/tasks', (request, response) => {
    let requestData = request.body;
    let newTask = createTask(requestData);
    dataStorage.push(newTask);
    return response.json(newTask);

});

app.put('/tasks/id/:id', (request, response) => {
    let id = request.params.id;
    let task = {};
    dataStorage.map((iterator, index) => {
        if (iterator.id === id) {
            taskComplete(iterator, index);
            task = iterator;
        }
    }
    );
    return response.json(task);
});

app.patch('/tasks/isComplete/:isComplete', (request, response) => {
    let isComplete = request.params[isComplete];
    const dataRequested = taskCompleteUtiltiy(isComplete);
    return response.json(dataRequested);

});
app.delete('/tasks/id/:id', (request, response) => {
    let id = request.params.id;
    deleteTask(id);
    return response.statusCode(200);
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

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
// const deleteTaskIsComplete = () => {
//     dataStorage = dataStorage.reduce((accumulator, iterator) => {
//         if (iterator.isComplete != true) {
//             accumulator.push(iterator);
//         }
//         return accumulator;
//     }, []);
// };
const taskCompleteUtiltiy = () => {
    dataStorage = dataStorage.reduce((accumulator, iterator) => {
        if (iterator.isComplete != true) {
            accumulator.push(iterator);
        }
        return accumulator;
    }, []);
};