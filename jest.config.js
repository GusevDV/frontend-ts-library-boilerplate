module.exports = {
    transform: { '^.+\\.ts$': 'ts-jest' },
    globals: {
        window: {
            location: {
                origin: 'http://localhost'
            }
        }
    }
};
