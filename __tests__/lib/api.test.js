'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe (' Server Testing ' , () =>
{

    it('500 Error ' , ()=>
    {
        return mockRequest
        .get('/gen-error')
        .then(data => {
            expect(data.status).toBe(500);
        }).catch(e => console.error(e));
    }); // 500 

}); // end of server testing 