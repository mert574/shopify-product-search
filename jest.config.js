module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: [
        '**/__tests__/**/*.spec.ts',
    ],
    testEnvironment: 'node',
};
