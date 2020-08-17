const request = require('supertest');
const Secuencia = require('../../models/secuencia');
let server;

describe('API Mutantes', () => {
    beforeEach( () => server = require('../../index'));
    afterEach(  () => server.close() );

    // URL /stats
    describe('(POST) /stats', () => {
        beforeEach( () => server = require('../../index'));
        afterEach(  () => server.close() );
        //------------------------------------------------------------ 
        it('Should be return status: OK - 200', async () => {
            const res = await request(server).post('/stats');
            expect(res.status).toBe(200);
        });
        //------------------------------------------------------------
        it('Should be return an object', async () => {
            const res = await request(server).post('/stats');
            expect(res.body).toMatchObject({});
        });
    });
    // URL /mutant
    describe('(POST) /mutant', () => {      
        it('Should be return: 400 - Bad Request, when array is empty', async() => {
            const res = await request(server).post('/mutant').send({"dna":[]});
            expect(res.status).toBe(400);
        });
        // //------------------------------------------------------------
        beforeEach(async () => await Secuencia.deleteMany());
        it('Should be return: 403 - Forbidden, when the sequence is human and does not exist in the database', async() => {
            const dna = ["ATGC","CAGT","TTAT","AGAA"];
            const res = await request(server).post('/mutant').send({"dna": dna});
            expect(res.status).toBe(403);
            
        });
        // //------------------------------------------------------------
        beforeEach(async () => await Secuencia.deleteMany());
        it('Should be return: 200 - Ok, when the sequence is mutant and does not exist in the database', async() => {
            const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
            const res = await request(server).post('/mutant').send({"dna": dna});
            expect(res.status).toBe(200);        
        });
        //------------------------------------------------------------
        it('Should be return: 409 - Conflict, when the sequence exist in the database', async() => {
            const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
            await request(server).post('/mutant').send({"dna": dna});
            const res = await request(server).post('/mutant').send({"dna": dna});
            expect(res.status).toBe(409);        
        });
        //------------------------------------------------------------

    })
});

