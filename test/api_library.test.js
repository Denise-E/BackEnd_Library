import { expect } from "chai"
import supertest from "supertest"
import book_generator from './generator/book_generator.js'

const request = supertest('http://127.0.0.1:8080')

describe(' *** Test APIRestfull *** ', () => {
     describe('GET', () => {
        it('Obtención exitosa del listado de reservas', async () => {
            const response = await request.get('/api/reservations')

            expect(response.status).to.eql(200)

            const added_book = response.body

            added_book.forEach(element => {
                expect(element).to.include.keys('_id','libro','cliente')
            });
        }) 
        it('Reserva no encontrada', async () => {
            const response = await request.get('/api/reservations/653df129df2a591fafe4947f')
            expect(response.status).to.eql(404)
        }) 
    })

    describe('POST', () => {
        it('* Incorporación exitosa de un nuevo libro', async () => {
            const book = book_generator.get_book()
            
            const response = await request.post('/api/books').send(book)
            expect(response.status).to.eql(201)

            const added_book = response.body.data
            
            expect(added_book).to.include.keys('title','author','stock')
            expect(added_book.title).to.eql(book.title)
            expect(added_book.author).to.eql(book.author)
            expect(added_book.stock).to.eql(book.stock)
            
            //console.log(added_book)
        })

        it('* Incorporación fallida de un nuevo libro', async () => {
            const book = book_generator.get_incorrect_book()
            const response = await request.post('/api/books').send(book)

            expect(response.status).to.eql(400)

            const not_added = response.body
            //console.log(not_added)
        })
    })
})