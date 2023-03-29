import facebookLogin from 'ts-messenger-api';
// for plain JavaScript use this:
// const facebookLogin = require('ts-messenger-api').default;
(async () => {
    const api = await facebookLogin({
        email: 'your.email@example.com',
        password: 'your_messenger_password'
    });
    const friends = await api.getFriendsList();
    await api.listen();
    await api.sendMessage({ body: 'Hi' }, friends[0].id);
})();
