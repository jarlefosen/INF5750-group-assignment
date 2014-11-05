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

## Android

The project can run on android. **If you are on a mac, please install XCode
and agree to the terms before proceeding**

[Download the Android SKD](http://developer.android.com/sdk/installing/index.html)

Install the newest platform image available.

**LINUX / OSX**

Open your `.bash_profile` or `.bashrc` file and enter the following

```
export ANDROID_HOME="/PATH/TO/ANDROID_SDK"
```

**WINDOWS**

Open your environmental variables in system settings and enter a new
variable named `ANDROID_HOME` with the value `/PATH/TO/ANDROID_SKD`

**Run the project on Android**

`$ cordova platform add android`

`$ npm run-script android`


Then you are good to go! The application will be installed on your connected device.
