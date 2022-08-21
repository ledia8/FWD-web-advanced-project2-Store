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
const users_model_1 = __importDefault(require("../models/users.model"));
const database_1 = __importDefault(require("../database"));
const userModel = new users_model_1.default();
// let user:User ;
describe('User Model', () => {
    describe('Test methods exists', () => {
        expect(userModel.getManyUsers).toBeDefined();
    });
    it('should have a get one user method', () => {
        expect(userModel.getOneUser).toBeDefined();
    });
    it('should have a create user method', () => {
        expect(userModel.createUser).toBeDefined();
    });
    it('should have an update user method', () => {
        expect(userModel.updateOneUser).toBeDefined();
    });
    it('should have a delete user method', () => {
        expect(userModel.deleteOneUser).toBeDefined();
    });
    it('should have an Authenticate user method', () => {
        expect(userModel.updateOneUser).toBeDefined();
    });
    describe('Test User Model Logic', () => {
        const user = {
            email: 'test1@test.com',
            user_name: 'testUser',
            first_name: 'test',
            last_name: 'user',
            password: 'test123',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield userModel.createUser(user);
            user.id = createUser.id;
        }));
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM Users;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create method should return anew user', () => __awaiter(void 0, void 0, void 0, function* () {
            const createUser = yield userModel.createUser({
                email: 'test2@test.com',
                user_name: 'testUser',
                first_name: 'test',
                last_name: 'user',
                password: 'test123',
            });
            expect(createUser).toEqual({
                email: 'test2@test.com',
                user_name: 'testUser',
                first_name: 'test',
                last_name: 'user',
                password: 'test123',
            });
        }));
        it('Get many method should return All available users in database', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.getManyUsers();
            expect(users.length).toBe(2);
        }));
        it('Get One method should return test user when called with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneUser = yield userModel.getOneUser(user.id);
            expect(returnOneUser.id).toBe(user.id);
            expect(returnOneUser.email).toBe(user.email);
            expect(returnOneUser.user_name).toBe(user.user_name);
            expect(returnOneUser.first_name).toBe(user.first_name);
            expect(returnOneUser.last_name).toBe(user.last_name);
        }));
        it('method update one user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnOneUser = yield userModel.updateOneUser(Object.assign(Object.assign({}, user), { user_name: 'test update', first_name: 'test', last_name: 'update' }));
            expect(returnOneUser.id).toBe(user.id);
            expect(returnOneUser.email).toBe(user.email);
            expect(returnOneUser.user_name).toBe('test update');
            expect(returnOneUser.first_name).toBe('test');
            expect(returnOneUser.last_name).toBe('update');
        }));
        it('Delete one user', () => __awaiter(void 0, void 0, void 0, function* () {
            const deleteUser = yield userModel.deleteOneUser(user.id);
            expect(deleteUser.id).toBe(user.id);
        }));
    });
});
