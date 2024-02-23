import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userId = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  it('/api/v1/user (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/api/v1/user')
      .set('Content-type', 'application/json')
      .send({
        email: 'jhonny.cage@email.io',
        name: 'Jhonny Cage',
        date_of_birth: '1999-02-22',
        location: 'Swansea',
      })
      .expect((res) => {
        userId = res.body.id;
      })
      .expect(201)
      .end(done);
  });

  it('/api/v1/user/:id (PUT)', (done) => {
    return request(app.getHttpServer())
      .put(`/api/v1/user/${userId}`)
      .send({ location: 'Jayapura' })
      .expect(200)
      .end(done);
  });

  it('/api/v1/user/:id (DELETE)', (done) => {
    return request(app.getHttpServer())
      .delete(`/api/v1/user/${userId}`)
      .expect(200)
      .end(done);
  });
});
