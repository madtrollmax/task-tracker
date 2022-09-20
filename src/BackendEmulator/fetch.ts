const response: Response = {
    headers: {} as Headers,
    ok: true,
    redirected: false,
    status: 200,
    statusText: '',
    type: 'default',
    url: '',
    clone: () => ({} as Response),

    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    json: () => Promise.resolve(),
    text: () => Promise.resolve(''),
};

const databaseDef = {
    boards: {},
    columns: {},
    tasks: {}
};

function getDatabase() {
    return JSON.parse(localStorage.getItem('database') || 'null') || databaseDef;
}


window.fetch = (resource, options) => new Promise((resolve, reject) => {
    const fullData = getDatabase();
   
    switch (true) {
        case (resource as string).startsWith('api/boards'): {
            if (!options || options.method === 'GET') {
                if (resource === 'api/boards') {
                    
                    resolve({
                        ...response,
                        json: () => Promise.resolve(Object.values(fullData.boards))
                    });
                } else {
                    const id = (resource as string).replace('api/boards/', '');
                    resolve({
                        ...response,
                        json: () => Promise.resolve({
                            ...fullData.boards[id], 
                            columns: fullData.boards[id].columns.map(
                                (colId: any) => Object.values(fullData.columns).find((col: any) => col.id === colId)
                            )
                        })
                    });
                }
            } else if (options.method === 'PUT') {
                const item = JSON.parse(options.body as string);
                item.columns = [];
                item.tasks = []

                if (!fullData.boards[item.id]) {
                    fullData.boards[item.id] = item;
                    localStorage.setItem('database', JSON.stringify(fullData));
                    resolve(response);
                } else {
                    reject({ ...response, status: 409, ok: false })
                }
            } else if (options.method === 'POST') {
                const item = JSON.parse(options.body as string);

                if (fullData.boards[item.id]) {
                    fullData.boards[item.id].title = item.title;
                    localStorage.setItem('database', JSON.stringify(fullData));
                    resolve(response);
                } else {
                    reject({ ...response, status: 404, ok: false })
                }
            } else if (options.method === 'DELETE') {
                const id = (resource as string).replace('api/boards/', '');

                if (fullData.boards[id]) {
                    delete fullData.boards[id];
                    localStorage.setItem('database', JSON.stringify(fullData));
                    resolve(response);
                } else {
                    reject({ ...response, status: 404, ok: false })
                }
            }
            break;
        }
        case (resource as string).startsWith('api/columns'): {
            // if (!options || options.method === 'GET') {
            //     if (resource === 'api/boards') {
                    
            //         resolve({
            //             ...response,
            //             json: () => Promise.resolve(Object.values(fullData.boards))
            //         });
            //     } else {
            //         const id = (resource as string).replace('api/boards/', '');
            //         resolve({
            //             ...response,
            //             json: () => Promise.resolve(fullData.boards[id])
            //         });
            //     }
            // } else 
            if (options && options.method === 'PUT') {
                const item = JSON.parse(options.body as string);
                const board = fullData.boards[item.boardId];

                if (!fullData.columns[item.id] && board) {
                    fullData.columns[item.id] = item;
                    fullData.boards ={
                        ...fullData.boards,
                        [item.boardId]: {...board, columns: [...board.columns, item.id]}
                    };
                    //board.columns.push(item.id);
                    localStorage.setItem('database', JSON.stringify(fullData));
                    resolve(response);
                } else {
                    reject({ ...response, status: 409, ok: false })
                }
            } 
            // else if (options.method === 'POST') {
            //     const item = JSON.parse(options.body as string);

            //     if (fullData.boards[item.id]) {
            //         fullData.boards[item.id].title = item.title;
            //         localStorage.setItem('database', JSON.stringify(fullData));
            //         resolve(response);
            //     } else {
            //         reject({ ...response, status: 404, ok: false })
            //     }
            // } else if (options.method === 'DELETE') {
            //     const id = (resource as string).replace('api/boards/', '');

            //     if (fullData.boards[id]) {
            //         delete fullData.boards[id];
            //         localStorage.setItem('database', JSON.stringify(fullData));
            //         resolve(response);
            //     } else {
            //         reject({ ...response, status: 404, ok: false })
            //     }
            // }
            break;
        }
        default: {
            reject({ ...response, status: 404, ok: false })
        }
    }
});

export { };