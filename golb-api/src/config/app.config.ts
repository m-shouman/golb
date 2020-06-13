const defaultDevPort = 3030;

export default () => ({
    PORT: process.env.PORT || defaultDevPort
});