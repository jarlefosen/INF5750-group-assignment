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
* [NPM - Node Package Manager](http://nodejs.org/)
* Bower - Web package manager

## Linting

The project includes Javascript Linting (eslinting).
To run it you have to set up the project first (see below).

Then run `grunt eslint`

This might fail if grunt is not installed globally. `npm install -g grunt grunt-cli` will fix this.

If you only want to see linting for the files you were working on, try
setting up the commit hook below.

## Commit hooks

We can run JavaScript linting after each commit to indicate if you have
written anything wrong.

Just run `./link_hooks.sh` and it will do it's job!

It will check javascript files that you have edited.

## Setup

It is important that you have NPM intsalled before you run this app.
It is THE package manager for [Node JS](http://nodejs.org/)

And then run the following code.

```
$ npm install
```

This will install all tools that the project depends on. Including Bower.
There exists a script in package.json that installs all bower dependencies
when you either start the app or installs npm dependencies.

**Remember** to run `$ npm install` when package.json and/or bower.json is updated.

## Run in browser

To run the project in the browser, just start `$ npm start` and all
dependencies will be installed.

**Note** That any calls from the browser to the server most likely will be blocked due to CORS security.

## Run on Android

The project can run on android. **If you are on a mac, please install XCode
and agree to the terms before proceeding**

[Download the Android SKD](http://developer.android.com/sdk/installing/index.html)

Install the newest platform image available.

Add ANDROID_HOME to path.

```
export ANDROID_HOME="/PATH/TO/ANDROID_SDK"
```

Use Grunt to set up project and deploy.

`$ grunt cordova` Will install plugins and platforms

`$ grunt android` Will deploy the application to your connected android phone.

`$ grunt android-emulator` if you want to use an emulator

## Run on IOS

Use Grunt to set up project and deploy.

`$ grunt cordova` Will install plugins and platforms

`$ grunt ios` Will deploy the application to your connected android phone.

`$ grunt ios-emulator` if you want to use an emulator
