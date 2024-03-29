const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {

  beforeEach(async () => {
    await connection.migrate.latest()
  })

  afterEach(async () => {
    await connection.migrate.rollback()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create new ONG', async () => {
    const response = await request(app)
      .post('ongs')
      .send({
        name: "APAD",
        email: "contato@apad.com.br",
        whatsapp: "4700000000",
        city: "Rio do Sul",
        uf: "SC"
      })
    
    expect(response.body).toHave('id')
    expect(response.body.id).toHaveLength(8)
  })
})