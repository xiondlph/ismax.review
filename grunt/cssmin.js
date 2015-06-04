module.exports = {
    index: {
        options: {
            banner: '/* Index minified */'
        },
        files: {
            'hosts/base/static/build/index.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/index.css']
        }
    },

    secure: {
        options: {
            banner: '/* Secure minified */'
        },
        files: {
            'hosts/base/static/build/secure.css': ['hosts/base/static/css/common.css']
        }
    },

    profile: {
        options: {
            banner: '/* Profile minified */'
        },
        files: {
            'hosts/base/static/build/profile.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/profile.css']
        }
    },

    simple: {
        options: {
            banner: '/* Simple minified */'
        },
        files: {
            'hosts/base/static/build/simple.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/simple.css']
        }
    },

    solutions: {
        options: {
            banner: '/* Solutions minified */'
        },
        files: {
            'hosts/base/static/build/solutions.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/simple.css', 'hosts/base/static/css/solutions.css']
        }
    }
};