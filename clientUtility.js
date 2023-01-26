const http = require('http');
const host = 'localhost';
const port = 8000;
const options = {
    hostname: `http://${host}:${port}`,
    path: '/',
    method: 'GET'
};

// Sending the request
const req = http.request(options, (res) => {
    let data = '';
     
    res.on('data', (chunk) => {
        data += chunk;
    });
    console.log(data);
    // Ending the response 
    res.on('end', () => {
        console.log('Body:', JSON.parse(data));
    });
       
}).on('error', (err) => {
    console.log('Error: ', err);
}).end();
req;