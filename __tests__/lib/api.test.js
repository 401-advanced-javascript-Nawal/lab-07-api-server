'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe(' Server Testing ', () => {

    /**************** Errors ****************/
    it('500 Error ', () => {
        return mockRequest
            .get('/gen-error')
            .then(data => {
                expect(data.status).toBe(500);
            }).catch(e => console.error(e));
    }); // 500 

    it('404 Error , Invalid route ', () => {
        return mockRequest
            .get('/main')
            .then(data => {
                expect(data.status).toBe(404);
            }).catch(e => console.error(e));
    }); // 404

    it('404 Error , Invalid method ', () => {
        return mockRequest
            .delete('/')
            .then(data => {
                expect(data.status).toBe(404);
            }).catch(e => console.error(e));
    }); // 404

    it('404 Error , Invalid method ', () => {
        return mockRequest
            .delete('/')
            .then(data => {
                expect(data.status).toBe(404);
            }).catch(e => console.error(e));
    }); // 404

    /**************** Routes ****************/

    it('Routes , Valid route test  ', () => {
        return mockRequest
            .get('/api/v1/categories')
            .then(data => {
                expect(data.status).toBe(200);
            }).catch(e => console.error(e));
    }); // 404



}); // end of server testing 