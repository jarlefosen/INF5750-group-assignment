#INF5750 Group Assignment

##Members
* Amund Øgar Meisal
* Christian Bergum Bergersen
* Jarle Fosen
* Vilde Fjeldstad

## About
Client web application written in Angular JS.

## Code style

### Indentation

**Javascript**
```
Tab size: 2
Indent: 2
Continuous indent: 2
```

**HTML**
```
Tab size: 2
Indent: 2
Continuous indent: 4
```

## Tools
* [NPM - Node Package Modules](http://npmjs.org/)
* [Bower - Package Manager for the Web](http://bower.io/)
* [Grunt - JavaScript Task Runner](http://gruntjs.com/)
* [Karma](http://karma-runner.github.io/)
* [Jasmine](http://jasmine.github.io/)

## Setup

It is important that you have NPM intsalled before you run this app.
NPM will automatically be installed with [Node JS](http://nodejs.org/)

And then run the following code in root folder.

```
$ npm install
```

This will install all tools that the project depends on. Including Bower.
There exists a script in package.json that installs all bower dependencies
when you either start the app or installs npm dependencies.

**Remember** to run `$ npm install` when package.json and/or bower.json is updated.


## Linting

The project includes Javascript Linting (eslinting).
To run it you have to set up the project first (see below).

Then run `$ grunt eslint`

This might fail if grunt is not installed globally. `$ npm install -g grunt grunt-cli` will fix this.

If you only want to see linting for the files you were working on, try
setting up the commit hook below.

## Commit hooks

We can run JavaScript linting after each commit to indicate if you have
written anything wrong.

Just run `$ ./link_hooks.sh` and it will do it's job!

It will check javascript files that you have edited.

## Testing

The project runs with Jasmine on Karma-runner for unit-testing.

You can test it continuously with `$ grunt test` or just once by `$ grunt test:fast`
