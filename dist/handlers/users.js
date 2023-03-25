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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.TOKEN_SECRET;
const store = new user_1.UserStore();
function userRoutestsc(app) {
    app.get('/users', index);
    app.get('/user/:id', show);
    app.post('/users', create);
    app.delete('/user/:id', remove);
    app.post('/login', login);
}
exports.default = userRoutestsc;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password_digest: req.body.password,
        };
        try {
            const newUser = yield store.create(user);
            const token = jsonwebtoken_1.default.sign({ user: newUser }, SECRET);
            res.json(token);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const user = yield store.show(id);
            res.json(user);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield store.index();
            res.json(users);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const user = yield store.delete(id);
            res.json(user);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        try {
            const user = yield store.authenticate(firstname, lastname, password);
            const token = jsonwebtoken_1.default.sign({ user: user }, SECRET);
            res.json(token);
        }
        catch (error) {
            res.status(400).json(error);
        }
    });
}
