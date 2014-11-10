var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.spec\.js$/i.test(file)) {
      tests.push(file);
    }
  }
}

require.config({

  paths: {
    "angular": "/base/www/bower_components/angular/angular",
    "angular-resource": "/base/www/bower_components/angular-resource/angular-resource",
    "angular-route": "/base/www/bower_components/angular-route/angular-route",
    "angular-mocks": "/base/www/bower_components/angular-mocks/angular-mocks"
  },

  baseUrl: "/base/www/js",

  shim: {
    "angular":          { exports: "angular" },
    "angular-route" :   { deps: ["angular"], exports: "route" },
    "angular-resource": { deps: ["angular"], exports: "resource" },
    "angular-mocks":    { deps: ["angular"], exports: "mocks" }
  },

  deps: tests,

  callback: window.__karma__.start

});

