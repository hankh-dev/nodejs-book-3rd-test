"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const middlewares_1 = require("../middlewares");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
// POST /auth/join
router.post('/join', middlewares_1.isNotLoggedIn, auth_1.join);
// POST /auth/login
router.post('/login', middlewares_1.isNotLoggedIn, auth_1.login);
// GET /auth/logout
router.get('/logout', middlewares_1.isLoggedIn, auth_1.logout);
// GET /auth/kakao
router.get('/kakao', passport_1.default.authenticate('kakao'));
// GET /auth/kakao/callback
router.get('/kakao/callback', passport_1.default.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
}), (req, res) => {
    res.redirect('/'); // 성공 시에는 /로 이동
});
exports.default = router;
