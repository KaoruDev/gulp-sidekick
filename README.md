gulp-node-sidekick
==================

Tired of bouncing your node server every single time there is a change? Fret no longer! Gulp-node-sidekick watches your node files and bounces the server on change.

Want to add more gulp tasks? Branch it and create a specific set of gulp task per project. This is really meant to be a boiler plate =)

## Setup

**Node**
http://nodejs.org/download/

```node -v``` to see if you already have it installed

After you clone down you will have to install the dependencies. ```npm install```

___

## Installation

````
parent-dir
	|
 	-gulp-node-side-kick
 	|
 	-my-node-project

````

git clone ```gulp-node-sidekick``` next to your node directory.

### Fire err up

cd into ```gulp-node-side-kick``` dir and fire up gulp using:
  ```gulp --serverDir=my-node-project nodeFile=app.js```

**Necessary flag:**

```--serverDir=my-node-project``` will tell gulp-node-sidekick where your project directory is.

**Optional flag:**

```--nodeFile=app.js``` the name of your node file. By default it is ```server.js```


```--debug``` will start run ```node debug server.js``` so that you may debug the server you are watching.
___

### Bigger projects
```gulp-node-sidekick``` listens to all js file changes. So if you are making changes to your Front-End work, you really don't need your server to bounce. In that case you may want to separate your app files.
````
parent-dir
	|
	-gulp-node-side-kick
	|
	-my-node-project
		|
		-app
			|
			-server.js
````
Instead of passing in just the name of the directory pass in the pathname ```--serverDir=my-node-project/app```

___

### Smaller projects

Say you only want to look at changes of static files in a sibling directory. ( Right now only html, but planning on implementing sass support )
Fire up ```gulp-static```
**Necessary flag:**

```--staticDir=NameOfStaticDir``` will tell gulp which directory to look for html static files.

***BUT WAIT THERE's MORE!*** you also have add this script tag to your html file you want to watch:

```<script src="http://localhost:35729/livereload.js?snipver=1"></script>```

Just be sure to remove it ( or not ) before you commit. This is what connects your client to the gulp task runner.

___

#### Version
```0.0.1``` - the Beginning =)
