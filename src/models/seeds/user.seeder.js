const db = require('../index')
const User = db.user

exports.userSeed = () => {
    User.create({
        name: 'Ilham',
        email: 'radithya.ilham@mail.com',
        phone: '082284985226',
        password: '$2a$08$Ri25LYKfKRAHBBFhh4B0BuRerhMRAuxkW0WbmFMkpWPOEULmKe6hy', //password
    })
}