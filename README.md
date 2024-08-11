# Simple Notes REST API using Node JS Framework ( Hapi )

In this repo consist a simple notes REST API using Hapi a Node JS web framework. The following material all comes from dicoding modules.  Here are the ist of endpoint that are built in this repo : 
* [POST] /notes 
* [GET] /notes
* [GET] /notes/{id}
* [PUT] /notes/{id}
* [DELETE] /notes/{id}

Here are the one of the implementation of single endpoint.
* Routes
```
const routes = [
  {
    method : 'POST',
    path : '/notes',
    handler : addNoteHandler
  },
  ...
```
* Handler
```
export const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, createdAt, updatedAt, tags, body
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  
  if (isSuccess) {
    const response = h.response({
      status : 'success',
      message : 'Catatan berhasil ditambahkan',
      data : {
        noteId : id
      }
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status : 'error',
    message : 'Catatan gagal untuk ditambahkan',
  });
  response.code(500);
  return response;
};
```
* Server
```
const init = async () => {
  const server = Hapi.server({
    port : 5000,
    host : 'localhost',
    routes : {
      cors : {
        origin : ['*']
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
```
This implementation also can be done in native Node JS or other Node JS web framework ( exporess )

* Native Node JS
```
const requestListener = (request, response) => {
    response.setHeader('Content-Type','application/json');
    response.setHeader('Powered-By','Node.js');
    
    let body = [];
    
    request.on('data', chunk => {
        body.push(chunk);
    });
    
    request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { title, tags, body } = JSON.parse(body);
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = { id, title, createdAt, updatedAt, tags, body };
        notes.push(newNote);

        const isSuccess = notes.filter((note) => note.id === id).length > 0;

        if (url === '/notes'){
            if(method === 'POST') {
                if (isSuccess) {
                    response.statusCode = 201;
                    response.end(JSON.stringify({
                      status : 'success',
                      message : 'Catatan berhasil ditambahkan',
                      data : {
                        noteId : id
                      }
                    }));
                } else {
                    response.statusCode = 500;
                    response.end(JSON.stringify({
                        status : 'error',
                        message : 'Catatan gagal untuk ditambahkan',
                     }));
                }
            }
        }
    ...
}

const server = http.createServer(requestListener);
const port = 5000;
const host = 'localhost';

server.listen(port,host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
```

The difference lies in how in native node js you need to define your logic in single file and it is hard to manage for future complex logic. In web framework for example hapi you can manage your routes and the handler for each route separately. This will improve the code readability and easier to mantain.
