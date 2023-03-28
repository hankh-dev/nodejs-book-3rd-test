"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
const kakaoStrategy_1 = __importDefault(require("./kakaoStrategy"));
const user_1 = __importDefault(require("../models/user"));
// export default () => {
//   passport.serializeUser()
// };
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        console.log('serialize');
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        console.log('deserialize');
        user_1.default.findOne({
            where: { id },
            include: [
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                    as: 'Followers',
                },
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                    as: 'Followings',
                },
            ],
        })
            .then((user) => {
            console.log('user', user);
            done(null, user);
        })
            .catch((err) => done(err));
    });
    (0, localStrategy_1.default)();
    (0, kakaoStrategy_1.default)();
};
