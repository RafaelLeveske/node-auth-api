export default {
  jwt: {
    privateKey: process.env.APP_PRIVATE_KEY || 'default',
    publicKey: process.env.APP_PUBLIC_KEY || 'default',
    expiresIn: '1d',
  },
};
