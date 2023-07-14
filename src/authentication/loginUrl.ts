export const loginUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${encodeURIComponent(process.env.BOT_ID)}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent('http://localhost:3978/api/oauth/redirect')}` +
    `&response_mode=query` +
    `&scope=openId profile offline_access User.Read` +
    `&prompt=consent`;