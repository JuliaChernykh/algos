module.exports = {
    testMatch: [
        '<rootDir>/problems/*.*'
    ],
    testEnvironment: 'node',
    moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
    transform: {
        '\\.tsx?$': 'ts-jest',
    }
};
