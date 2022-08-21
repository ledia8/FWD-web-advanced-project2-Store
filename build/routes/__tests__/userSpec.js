"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const server_1 = __importDefault(require("../../server"));
const userModel = new users_model_1.default();
const request = (0, supertest_1.default)(server_1.default);
let token = '';
describe('user API Endpoints', () => {
    const user = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'test',
        last_name: 'user',
        password: 'test123',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield userModel.create(user);
        user.id = createUser.id;
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM Users;';
        yield connection.query(sql);
        connection.release();
    }));
    describe('Test Authenticate method', () => {
        it('should be able to authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/authenticate')
                .set('content-type', 'application/json')
                .send({
                email: 'test@test.com',
                password: 'test123',
            });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        }));
        it('should be failed to authenticate with wrong email', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/authenticate')
                .set('content-type', 'application/json')
                .send({
                email: 'wrong@test.com',
                password: 'test123',
            });
            expect(res.status).toBe(401);
        }));
    });
    describe('Test CRUD API methods', () => {
        it('should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/user/')
                .set('content-type', 'application/json')
                .send({
                email: 'test2@test2.com',
                user_name: 'testUser2',
                first_name: 'test2',
                last_name: 'user2',
                password: 'test123',
            });
            expect(res.status).toBe(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe('test2@test2.com');
            expect(user_name).toBe('testUser2');
            expect(first_name).toBe('test2');
            expect(last_name).toBe('user2');
        }));
        it('should get list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/user/')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        }));
        it('should get user info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/user/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user_name).toBe('test2@test2.com');
            expect(res.body.data.email).toBe('testUser2');
        }));
        it('should update user info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/api/user/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, user), { user_name: 'lm', first_name: 'l', last_name: 'm' }));
            expect(res.status).toBe(200);
            const { id, email, user_name, first_name, last_name } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe(user.email);
            expect(user_name).toBe('lm');
            expect(first_name).toBe('l');
            expect(last_name).toBe('m');
        }));
        it('should delete user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/api/user/${user.id}`)
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
            expect(res.body.data.user_name).toBe('lm');
        }));
    });
});
