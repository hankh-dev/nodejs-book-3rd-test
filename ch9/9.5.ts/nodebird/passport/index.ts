import passport from 'passport';
import local from './localStrategy';
import kakao from './kakaoStrategy';
import User from '../models/user';

// export default () => {
//   passport.serializeUser()
// };

export default () => {
  passport.serializeUser((user, done) => {
    console.log('serialize');
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    console.log('deserialize');
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        },
        {
          model: User,
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

  local();
  kakao();
};
