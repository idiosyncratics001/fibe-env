import * as path from 'path'
import * as module from 'module'
import getEnvFromFile from './getenv.js'

export default class _env {
    static #meta = {}
    static #env = {}
        
    constructor(options = {}) {
        const file = path.join(options.path || process.cwd(), options.file || '.env');
        
        if (Object.isFrozen(_env)) {
            throw Error('env locked, cannot apply changes to env');
        } else {
            _env.#meta.file = _env.#meta.file || [];
            _env.#meta.file.push(new Date, file);
            _env.#meta.active = _env.#meta.active || new Date;
            
            _env.#env.PATH_ROOT = process.cwd();
            Object.assign(_env.#env, getEnvFromFile(file));

            options.strict === true || _env.#env.FIBE_ENV_STRICT === 'true'
                ? _env.setStrict()
                : _env.#meta.strict = false;
            
            // --[ experimental ]--
            options.intrinsics === true || _env.#env.FIBE_ENV_INTRINSICS === 'true'
                ? _env.setIntrinsics()
                : _env.#meta.intrinsics = false;
            
            options.processEnv === true || _env.#env.FIBE_ENV_PROCESS_ENV === 'true'
                ? _env.setProcessEnv()
                : _env.#meta.processEnv = false;
            
            options.global === true || _env.#env.FIBE_ENV_GLOBAL === 'true'
                ? _env.setGlobal()
                : _env.#meta.global = false;

            options.checkOut === true || _env.#env.FIBE_ENV_CHECKOUT === 'true'
                ? _env.#meta.checkOut = true
                : _env.setCheckIn();
        }
    }

    static getMeta(){
        return _env.#meta;
    }

    static getEnv(){
        return _env.#env;
    }
    
    static setEnv(key, value) {
        if (Object.keys(_env.#env).includes(key)) return "key already exists"
        _env.#env[key] = value
    }

    static delEnv(key) {
        if (!Object.keys(_env.#env).includes(key)) return "key doesn't exist"
        delete _env.#env[key]
    }

    static setCheckIn() {
        if (Object.isFrozen(_env)) return true;
        if (_env.#meta.checkOut) _env.#meta.checkOut = false;
        _env.#meta.checkIn = true;
        _env.#meta.checkInTime = new Date;
        Object.freeze(_env, _env.#meta, _env.#env);
        return true;
    }

    static setStrict(){
    // https://www.npmjs.com/package/use-strict
    // Thank you Isaacs!
    // STRICT EVERYWHERE!!
        if (Object.isFrozen(module.wrap)) return true;
        module.Module.wrapper[0] += '"use strict";';
        Object.freeze(module.wrap);
        _env.#meta.strict = true;
    }

    static setProcessEnv() {
    // https://github.com/vorticalbox
    // Thank you vorticalbox!
        process.env = new Proxy({...process.env}, {
            set: function(obj, prop, value) {
                throw Error('process.env locked, cannot apply changes to process.env')
            }
        });
        _env.#meta.processEnv = true;
    }

    static setIntrinsics() {
    // --[ Experimental ]--
        process.env.NODE_OPTIONS = '--frozen-intrinsics';
        _env.#meta.intrinsics = true;
    }

    static setGlobal() {
        if (Object.isFrozen(global)) return true;
        Object.freeze(global);
        _env.#meta.global = true;
    }

    static setLockdown() {
        setStrict();
        setProcessEnv();
        setCheckIn();
    }
}

