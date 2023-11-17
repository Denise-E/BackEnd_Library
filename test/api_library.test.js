import { expect } from "chai"
import supertest from "supertest"
import book_generator from './generator/book_generator.js'

const request = supertest('http://127.0.0.1:8080')

describe(' *** Test APIRestfull *** ', () => {
    /* describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const reponse = await request.get('/api/productos')
            expect(reponse.status).to.eql(200)
        })
    }) */

    describe('POST', () => {
        it('* Incorporación exitosa de un nuevo libro', async () => {
            const producto = book_generator.get_book()

            const response = await request.post('/api/books').send(producto)
            expect(response.status).to.eql(201)

            const prodGuardado = response.body
            console.log(prodGuardado)
            expect(prodGuardado).to.include.keys('title','author','stock')
            expect(prodGuardado.title).to.eql(producto.title)
            expect(prodGuardado.author).to.eql(producto.author)
            expect(prodGuardado.stock).to.eql(producto.stock)
        })
    })
})