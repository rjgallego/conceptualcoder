const passport = require('../../config/passport');
const userRouter = require('express').Router();
const auth = require('./auth');
const Users = require('../../models/Users');

userRouter.post('/', auth.optional, function(req, res){
    const user = req.body.user;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required'
            }
        })
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        })
    }

    const finalUser = new Users(user);
    finalUser.setPassword(user.password);
    
    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
})


userRouter.post('/login', auth.optional, (req, res, next) => {
        const {body: {user}} = req;

        if(!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required'
                }
            })
        }
        
        if(!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required'
                }
            })
        }
        next();
    },
    passport.authenticate('local'), (req, res) => {
        if(req.user) {
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            const user = req.user;
            user.token = user.generateJWT();

            return res.status(200).json({user: {
                id: user._id,
                email: user.email,
                token: user.token
            }});

        }

        return res.sendStatus(404);
    }
);

userRouter.get('/logout', auth.optional, (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    req.logout();
    return res.json({loggedIn: false})
})



userRouter.get('/current', auth.required, (req, res, next) => {
    const { payload: {id}} = req;

    return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }
            return res.json({ user: user.toAuthJSON() });
        })
});

userRouter.get('/checkLogin', auth.optional, (req, res, next) => {
    if(req.session.passport && req.session.passport.user){
        return res.json({loggedIn: true});
    }
    return res.json({loggedIn: false});
})

module.exports = userRouter;