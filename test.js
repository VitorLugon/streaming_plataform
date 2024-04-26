import request from 'supertest';
import app from './server.js' 
import User from './models/userModel';
import Subscriber from './models/subscriberModel.js';

describe('Testes para userRoutes', () => {
    let token; // armazenará o token JWT para autorização

    before((done) => {
        // Antes de iniciar os testes, autenticamos um usuário e obtemos o token
        request(app)
            .post('/api/user/auth')
            .send({ email: 'example@example.com', password: 'examplepassword' })
            .end((err, res) => {
                if (err) return done(err);
                token = res.headers['authorization']; // assumindo que o token é retornado como cabeçalho 'authorization'
                done();
            });
    });
})
    describe('POST /api/user/auth', () => {
        it('deve autenticar o usuário e retornar um token JWT', (done) => {
            request(app)
                .post('/api/user/auth')
                .send({ email: 'example@example.com', password: 'examplepassword' })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    // Verificar se o token JWT é retornado
                    if (!res.headers['authorization']) return done(new Error('Token JWT não foi retornado'));
                    done();
                });
        });
    });

    describe('POST /api/users', () => {
        it('deve criar um novo usuário', (done) => {
            request(app)
                .post('/api/users')
                .send({ name: 'Novo Usuário', email: 'newuser@example.com', password: 'newpassword' })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err);
                    // Verificar se o usuário foi criado corretamente
                    User.findOne({ email: 'newuser@example.com' })
                        .then((user) => {
                            if (!user) return done(new Error('Usuário não foi criado corretamente'));
                            done();
                        })
                        .catch((err) => done(err));
                });
        });
    });

    describe('Testes para subscriberRoutes', () => {
        // Variável para armazenar o ID do assinante criado para uso nos testes
        let subscriberId;

        before((done) => {
            // Antes de iniciar os testes, criamos um assinante de exemplo para uso nos testes
            const newSubscriber = new Subscriber({
                name: 'Test Subscriber',
                subscribedToChannel: 'Test Channel'
            });
            newSubscriber.save((err, subscriber) => {
                if (err) return done(err);
                subscriberId = subscriber._id;
                done();
            });
        });

        describe('GET /api/subscribers', () => {
            it('deve retornar todos os assinantes', (done) => {
                request(app)
                    .get('/api/subscribers')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) return done(err);
                        // Verificar se os assinantes foram retornados corretamente
                        // Aqui você pode verificar se a resposta contém os assinantes esperados
                        done();
                    });
            });
        });

        describe('GET /api/subscribers/:id', () => {
            it('deve retornar um assinante específico', (done) => {
                request(app)
                    .get(`/api/subscribers/${subscriberId}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((err, res) => {
                        if (err) return done(err);
                        // Verificar se o assinante retornado corresponde ao ID esperado
                        done();
                    });
            });
        });
});

