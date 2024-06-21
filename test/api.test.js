// Import request from supertest
const request = require('supertest');
const app = require('../index');

describe('Testing API', () => {
  // Testing '/test' api
  it('GET /test | Response with text', async () => {
    // Sending request to the server
    const response = await request(app).get('/test');

    // Checking the Status code
    expect(response.statusCode).toBe(200);

    // Checking the response object
    expect(response.text).toBe('Test API is Working!....');
  });

  it('GET Products | Fetch all Products', async () => {
    const response = await request(app).get('/api/product/get_all_products');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual('Products fetched successfully');
  });

  // Registration testing
  // Sending a POST request to the server (Along with the data)
  // 1. expect the status code to be 201
  // 2. If the object already exists, expect the message to be 'User already exists' and handle accordingly
  // 3. Success

  it('POST /api/user/create | Response with body', async () => {
    const response = await request(app).post('/api/user/create').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@gmail.com',
      password: '12345678',
    });

    // If Else Condition
    if (!response.body.success) {
      expect(response.body.message).toEqual('User Already Exists');
    } else {
      expect(response.body.message).toEqual('User Created Successfully');
    }
  });

  it('POST /api/user/login | Response with body', async () => {
    const response = await request(app).post('/api/user/login').send({
      email: 'JohnDoe@gmail.com',
      password: '12345678',
    });
    if (response.body.statusCode === 400) {
      expect(response.body.message).toEqual('User not found');
    } else if (response.body.statusCode === 300) {
      expect(response.body.message).toEqual('Invalid Password');
    } else {
      expect(response.body.message).toEqual('User logged in successfully');
    }
  });
});
