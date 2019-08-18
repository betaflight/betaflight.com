const axios = require('axios');
const logger = require('./logger');

const baseUrl = 'https://api.github.com';

const config = {
    auth: {
        username: process.env.GITHUB_LOGIN,
        password: process.env.GITHUB_TOKEN
    }
};

const getMember = async (memberLogin) => {
    logger.info(` - getting member: ${memberLogin}`)
    const response = await axios.get(`${baseUrl}/users/${memberLogin}`, config);
    logger.success(`  -> ${response.data.login}`);
    return response.data;
}

const getMembers = async (org) => {

    logger.info('Getting public members:');
    const response = await axios.get(`${baseUrl}/orgs/${org}/public_members`, config);

    var memberLogins = response.data.map(member => member.login);
    logger.success(memberLogins);

    try
    {
        return await Promise.all(
            memberLogins.map(async (login) => getMember(login)));
    }
    catch (err)
    {
        logger.fail(err);
        throw err;
    }
};

module.exports = {
    getMembers,
    getMember
}
