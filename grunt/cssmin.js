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

    payment: {
        options: {
            banner: '/* Payment minified */'
        },
        files: {
            'hosts/base/static/build/payment.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/payment.css']
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

    demo: {
        options: {
            banner: '/* Demo minified */'
        },
        files: {
            'hosts/base/static/build/demo.css': ['hosts/base/static/css/common.css', 'hosts/base/static/css/demo.css']
        }
    }
};