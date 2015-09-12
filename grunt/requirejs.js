module.exports = {
    index: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
                text        : '../lib/requirejs/text',
                jquery      : '../lib/jquery/jquery-2.1.1.min',
                validator   : '../lib/validator.min',
                underscore  : '../lib/underscore/underscore-min',
                backbone    : '../lib/backbone/backbone-min',

                Templates   : '../Templates'
            },

            shim: {
                'backbone': {
                    deps    : ['underscore', 'jquery'],
                    exports : 'Backbone'
                }
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Index",
            out: "hosts/base/static/build/index.js",
            include: ["requireLib"]
        }
    },

    secure: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
                text        : '../lib/requirejs/text',
                jquery      : '../lib/jquery/jquery-2.1.1.min',
                validator   : '../lib/validator.min',
                underscore  : '../lib/underscore/underscore-min',
                backbone    : '../lib/backbone/backbone-min',

                Templates   : '../Templates'
            },

            shim: {
                'backbone': {
                    deps    : ['underscore', 'jquery'],
                    exports : 'Backbone'
                }
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Secure",
            out: "hosts/base/static/build/secure.js",
            include: ["requireLib"]
        }
    },

    profile: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
                text        : '../lib/requirejs/text',
                jquery      : '../lib/jquery/jquery-2.1.1.min',
                validator   : '../lib/validator.min',
                underscore  : '../lib/underscore/underscore-min',
                backbone    : '../lib/backbone/backbone-min',
                ace         : '../lib/ace-builds/src/ace',

                Templates   : '../Templates'
            },

            shim: {
                'backbone': {
                    deps    : ['underscore', 'jquery'],
                    exports : 'Backbone'
                }
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Profile",
            out: "hosts/base/static/build/profile.js",
            include: ["requireLib"]
        }
    },

    simple: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib  : '../lib/requirejs/require',
                text        : '../lib/requirejs/text',
                jquery      : '../lib/jquery/jquery-2.1.1.min',
                validator   : '../lib/validator.min',
                underscore  : '../lib/underscore/underscore-min',
                backbone    : '../lib/backbone/backbone-min',

                Templates   : '../Templates'
            },

            shim: {
                'backbone': {
                    deps    : ['underscore', 'jquery'],
                    exports : 'Backbone'
                }
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Simple",
            out: "hosts/base/static/build/simple.js",
            include: ["requireLib"]
        }
    },

    demo: {
        options: {
            baseUrl: "hosts/base/static/js",
            paths: {
                requireLib      : '../lib/requirejs/require',
                text            : '../lib/requirejs/text',
                jquery          : '../lib/jquery/jquery-2.1.1.min',
                validator       : '../lib/validator.min',
                autocomplete    : '../lib/autocomplete.min',
                underscore      : '../lib/underscore/underscore-min',
                backbone        : '../lib/backbone/backbone-min',

                Templates       : '../Templates'
            },

            shim: {
                'backbone': {
                    deps    : ['underscore', 'jquery'],
                    exports : 'Backbone'
                }
            },
            preserveLicenseComments: false,
            optimize: 'uglify2',
            name: "Demo",
            out: "hosts/base/static/build/demo.js",
            include: ["requireLib"]
        }
    }
};