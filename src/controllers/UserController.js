const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async index(req, res){
        const {page = 1} = req.query;
        const users = await User.paginate({}, {page, limit: 10});

        return res.json(users);
    },

    async show(req, res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async store(req, res){
        const user = await User.create(req.body);

        return res.json(user);
    },

    async update(req, res){
        const user = await User.findOneAndUpdate(req.param.id, req.body, {new: true});

        if(user == null){
            return res.status(404).send('user not found');
        }
        return res.json(user);
    },

    async destroy(req, res){
        await User.findOneAndDelete(req.param.id);

        return res.send();
    },

    async login(req, res){
        const user = await User.findOne({email: req.body.email, password: req.body.password}, 
            function(err, user){
                if(err != null){
                    console.log(err);
                }
                return user;
            });
        // console.log(res.status);
        //se o usuario não for encontrado, retornar erro com mensagem
        if(user == null){
            return res.status(404).send('user not found');
        }
        return res.json(user);
    },

    async loginWithFacebook(req, res){
        const user = await User.findOne({email: req.body.email},
            function(err, user){
                if(err != null){
                    console.log(err);
                }
                return user;
            });
        if(user == null){
            //usuário ainda não existe
            const newUser = await User.create(req.body);
            return res.json(newUser);
        }else{
            if(user.facebookId == null){
                //usuário já existe, mas nunca fez login social
                const newUser = await User.findOneAndUpdate(user._id, req.body, {new: true});
                return res.json(newUser);
            }else{
                if(user.facebookId == req.body.facebookId){
                    //usuário logou corretamente com o facebook
                    return res.json(user);
                }else{
                    //usuário logou com facebook diferente do já cadastrado
                    return res.status(403).send('Social credentials do not match');
                }
            }
        }
    }
};