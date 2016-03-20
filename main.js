/*######################################################
 Set up require.js
 require.js will ensure our dependancies are enforced (recommended by
 the creater of angular). This will allow ease for testing

 Documentation:

 baseUrl: self explanitory
 paths: attach an alias to a path
 Example: 'angular' : '/static/common/js/libs/angular/angular'
 which will look for /static/common/js/libs/angular/angular.js

 using the alias will force modules to make to load
 required alia(s) before doing any sort of code configuration
 Example:
 define(['app', 'angular','common/js/example' ], function(app) {
 ... } //javascript code in here

 app routes to the path /static/app/app.js
 since common/js/example isn't defined in paths
 then require.js will load /static/common/js/example.js
 one time, if example is used more than one place
 then it's better to give it a path

 deps: will initiate the startin depedancies which in term will
 start the real program boostrap.js

 this is a proper definition for shim.
 shim : Configure the dependencies, exports, and custom initialization for older,
 traditional "browser globals" scripts that do not use define() to declare the
 dependencies and set a module value.
 ######################################################*/

require.config({
    baseUrl: "",
    paths: {
        'angular': 'common/angular/angular.min',
        'angularLocalStorage': 'common/angular-local-storage/dist/angular-local-storage',
        'angularResource': 'common/angular-resource/angular-resource.min',
        'angularAMD': 'common/angularAMD/angularAMD.min',
        'ngload': 'common/angularAMD/ngload.min',
        'uiRouter': 'common/angular-ui-router/release/angular-ui-router.min',
        'uiBootstrap': 'common/angular-bootstrap/ui-bootstrap-tpls',
        'routeResolver': 'libs/routeResolver',
        'jquery': 'common/jquery/dist/jquery.min',
        'underscore': 'common/underscore/underscore-min',
        'angularFileUpload': 'common/angular-file-upload/dist/angular-file-upload.min',
        'jquery.nicescroll': 'common/jquery.nicescroll/dist/jquery.nicescroll.min',
        'angularNiceScroll': 'common/angular-nicescroll/angular-nicescroll',
        'ui.utils': 'common/angular-ui-utils/ui-utils.min',
        'masonry': 'common/masonry/dist/masonry.pkgd.min',
        'imagesloaded': 'common/imagesloaded/imagesloaded.pkgd.min',
        'angular-masonry': 'libs/angular-masonry/angular-masonry',
        // 'angularFileUploadShim': 'common/ng-file-upload/angular-file-upload-shim.min',
        // 'bootstrap.modal': 'common/bootstrap/js/modal', // I needed this to get the wysihtml5 image and link modals working
        'smoothscroll': 'libs/smoothscroll',
        'checklist-model': 'libs/checklist-model',
        'retinajs': 'common/retinajs/dist/retina.min',
        'jquery-bridget': 'common/jquery-bridget/jquery.bridget',
        'linkjs': 'common/nouislider/Link',
        'jquery.nouislider': 'common/nouislider/jquery.nouislider.min',
        'jquery.magnific-popup': 'common/magnific-popup/dist/jquery.magnific-popup.min',
        'owl.carousel': 'libs/owl.carousel.min',
        'WOW': 'libs/wow',
        'angularNouislider': 'common/angular-nouislider/src/nouislider.min',
        'angular-loading-bar': 'common/angular-loading-bar/build/loading-bar.min',
        'angular-websocket': 'common/angular-websocket/angular-websocket.min',
        // 'uknacks': 'libs/uknacks',
        // 'bootstrap': 'common/bootstrap/dist/js/bootstrap.min',
        'footer': 'views/footer/app',
        'app': 'app',
        'modals': 'views/modals/app',
        'chatbox': 'directives/chatbox/chatbox',
        'header': 'views/header/app',
        'headroom': 'libs/headroom.min',
        'angular-headroom': 'libs/angular.headroom.min'
    },

    //Angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angularAMD': ['angular'],
        'angularLocalStorage': ['angular'],
        'angularResource': ['angular'],
        'uiRouter': ['angular'],
        'underscore': ['angular'],
        'uiBootstrap': ['angular'],
        // 'footer': ['app'],
        'angularFileUpload': ['angular'],
        'ui.utils': ['angular'],
        'jquery.nicescroll': ['jquery'],
        'jquery.nouislider': ['jquery'],
        'jquery.magnific-popup': ['jquery'],
        'angularNiceScroll': ['angular', 'jquery.nicescroll'],
        'angularNouislider': ['angular', 'linkjs', 'jquery.nouislider' ],
        'angular-loading-bar': ['angular'],
        'imagesloaded': ['jquery'],
        'masonry': ['jquery', 'jquery-bridget'],
        'angular-masonry': ['angular', 'imagesloaded', 'masonry'],
        'caret': ['jquery'],
        'smmothscroll': ['jquery'],
        'checklist-model': ['angular'],
        'retinajs': ['jquery'],
        'linkjs': ['jquery'],
        'jquery-bridget': ['jquery'],
        'angular-websocket': ['angular'],
        'angular-headroom': ['angular', 'headroom'],
        'owl.carousel': ['jquery']
    },
    // Version the app to avoid cache issues
    urlArgs: "0.1.0",
    waitSeconds: 200,
    // Kick start application
    deps: ['app']
});


