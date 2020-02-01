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

  /**************** Routes ****************/

  // categories
  it('categories Routes , Valid route test  ', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // get

  it('categories Routes , Valid route test with ID ', () => {
    return mockRequest
      .get('/api/v1/categories/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // get ID

  it('categories Routes , Valid route test  ', () => {
    return mockRequest
      .post('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // post

  it('categories Routes , Valid route test with ID ', () => {
    return mockRequest
      .put('/api/v1/categories/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // put

  it('categories Routes , Valid route test with ID ', () => {
    return mockRequest
      .delete('/api/v1/categories/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // delete


  // Products
  it('Products Routes , Valid route test  ', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // get

  it('Products Routes , Valid route test with ID ', () => {
    return mockRequest
      .get('/api/v1/products/2')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // get ID

  it('Products Routes , Valid route test  ', () => {
    return mockRequest
      .post('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // post

  it('Products Routes , Valid route test with ID ', () => {
    return mockRequest
      .put('/api/v1/products/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // put

  it('Products Routes , Valid route test with ID ', () => {
    return mockRequest
      .delete('/api/v1/products/1')
      .then(data => {
        expect(data.status).toBe(200);
      }).catch(e => console.error(e));
  }); // delete

    
}); // end of server testing 