Managing environment variables and distribution

===

ES6 styled .env settings and distribution throughout your application.


### The why is power:

The first in a series of fibe modules.
Starting a new project, a different take on (un)known problems. The modules will be published as we go with this project in the hope it gives you good vibes.

--with love, quirks and glitches, Idiosyncratics


### Get fibe-env

```bash

npm install fibe-env

```

### See example

Example included in the repository.


### Usage

Add an .env file to your project root and define key and value pairs.


```
ENV_KEY1   value

ENV_KEY2   this_is_fine
ENV_KEY2   this_is_removed
ENV_KEY6 : this_is_not_fine
ENV_KEY7   ENV_NODE_KEY7 doube_key_removed      
ENV_KEY9:  this_is_a_comma-end, ENV_NODE_KEY9b: KEY9b_ignored,
ENV_KEY11: 192.168.0.1
EN-V_K.E.Y12: only_underscore_allowed_in_key
ENV_NODE_KEY13: ^&*

```
Import the module and add the config.

```javascript
import env from 'fibe-env';
const newEnv = new env();

```
That's it!, your .env content is now available.

Get commands to view your env.
```javascript
// get the configuration.
getMeta()

// get the env variables.
getEnv()
```

### Secured

By default the .env variables are checked in, meaning they can not be altered or new pairs added.
The options and variables can only be viewed with the get functions.

### Options and settings
To set fibe-env options:


Put them in the .env:
```
FIBE_ENV_STRICT: true
FIBE_ENV_CHECKOUT: false
FIBE_ENV_INTRINSICS: false
FIBE_ENV_PROCESS_ENV: false
FIBE_ENV_GLOBAL: false

```
Pass an options object:

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
const newEnv = new env(options);

```

Alternatively you can call options separately:

```javascript
// set a new key-value pair, double keys are not added.
setEnv(key, value)

// delete a new key-value pair.
delEnv(key)

// check-in of your env scope (cannot be checked out).
setCheckIn()

// set use-strict on all modules.
setStrict()

// check-in of your process.env scope (cannot be undone).
setProcessEnv()

// "--frozen-intrinsics": JavaScript objects and functions are recursively frozen, except for globalThis.
// If node is not started with this as an argument it can still be applied to worker & child-processes.
setIntrinsics()

// check-in global variables scope.
setGlobal()

// check-in strict, global and env with one command. 
setLockdown() 

```

### It's all thanks to you

Thanks to all the patient people on forums and contributors helping curious and creative people solve their problems, one at a time. Thank you.



