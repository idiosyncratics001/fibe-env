### Managing environment variables and distribution


ES6 styled .env settings and distribution throughout your application.


### The why is power:

After trying several methods and npm modules a feeling of "this is not it.." and/or "this is too much.." happened.
Starting a new project, a different take on a (un)known problems, the modules will be published as we go in the hope it gives you good vibes.

--with love, quirks and glitches, Idiosyncratics


### Get Env.

```bash

npm install fibe-env

```


### Usage

Add an .env file to your project root and define key and value pairs.
See example if you want to skip.

```
ENV_KEY env_value

env_node_key1   this_is_fine
ENV_NODE_KEY2   this_is_fine
ENV_NODE_KEY2   this_is_removed
ENV_NODE_KEY3   this_is_fine
ENV_NODE_KEY4:  this_is_fine
ENV_NODE_KEY5$  this_is_fine
ENV_NODE_KEY6 : this_is_not_fine
ENV_NODE_KEY7   ENV_NODE_KEY7 doube_key_removed      
ENV_NODE_KEY8:  this_is_fine
ENV_NODE_KEY9:  this_is_a_comma-end, ENV_NODE_KEY9b: KEY9_ignored,
ENV_NODE_KEY11: 192.168.0.1
ENV_NO-DE_K.E.Y12: only_underscore_allowed_in_key
ENV_NODE_KEY13: ^&*

```
In your first run.js / index.js / something.js import the module.

```javascript
import env from 'fibe-env';
const newEnv = new env();

```
That's it, your .env content is now available.

### Secured

By default the env variables are checked in, meaning they can not be altered or new pairs added.
The options and variables can only viewed with the get functions.

### Options and settings

To set fibe-env options either put them in the .env like so:
```
FIBE_ENV_STRICT: true
FIBE_ENV_CHECKOUT: false
FIBE_ENV_INTRINSICS: false
FIBE_ENV_PROCESS_ENV: false
FIBE_ENV_GLOBAL: false

```
Or pass an options object like so:

```javascript
const options = {
    file: '.env',
    path: __dirname,
    strict: true,
    checkout: false,
    processEnv: false,
    global: false,
    intrinsics: false
}

```

Alternatively you can call them as you desire:

```javascript
// get the configuration.
getMeta()

// get the env variables.
getEnv()

// set a new key-value pair, double keys are not added.
setEnv(key, value)

// set a new key-value pair.
static delEnv(key)

// check-in of your env scope (cannot be checked out).
setCheckIn()

// set use-strict on all modules.
setStrict()

// check-in of your process.env scope (cannot be undone).
setProcessEnv()

// "--frozen-intrinsics": JavaScript objects and functions are recursively frozen, except for globalThis.
// If node is not started with this argument it can still be applied to worker & child-processes.
setIntrinsics()

// check-in global variables scope.
setGlobal()

// For when your app has the go-live signal and you want to check-in strict, global and env.
setLockdown() 

```

### It's all thanks to you

This is possible thanks to all the patient people on forums and contributors helping curious and creative people solve their problems, one at a time. Thank you.



