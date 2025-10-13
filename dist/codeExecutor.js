"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = executeCode;
const esbuild_1 = require("esbuild");
const vm = __importStar(require("vm"));
async function executeCode(code, language) {
    const output = [];
    const errors = [];
    let returnValue;
    // Transform TypeScript to JavaScript if needed
    let jsCode = code;
    if (language === 'typescript') {
        try {
            const result = await (0, esbuild_1.transform)(code, {
                loader: 'ts',
                target: 'es2020',
                format: 'cjs'
            });
            jsCode = result.code;
        }
        catch (error) {
            errors.push(`TypeScript compilation error: ${error.message}`);
            return { output, errors, returnValue: undefined };
        }
    }
    // Create a custom console object to capture output
    const customConsole = {
        log: (...args) => {
            output.push(args.map(arg => formatValue(arg)).join(' '));
        },
        error: (...args) => {
            errors.push(args.map(arg => formatValue(arg)).join(' '));
        },
        warn: (...args) => {
            output.push(`⚠️ ${args.map(arg => formatValue(arg)).join(' ')}`);
        },
        info: (...args) => {
            output.push(`ℹ️ ${args.map(arg => formatValue(arg)).join(' ')}`);
        },
        debug: (...args) => {
            output.push(`🐛 ${args.map(arg => formatValue(arg)).join(' ')}`);
        },
        clear: () => {
            output.length = 0;
            errors.length = 0;
        },
        table: (data) => {
            output.push(JSON.stringify(data, null, 2));
        },
        dir: (obj) => {
            output.push(JSON.stringify(obj, null, 2));
        }
    };
    // Create a sandbox with controlled globals
    const sandbox = {
        console: customConsole,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval,
        Promise,
        Array,
        Object,
        String,
        Number,
        Boolean,
        Math,
        Date,
        JSON,
        RegExp,
        Map,
        Set,
        WeakMap,
        WeakSet,
        Symbol,
        Error,
        TypeError,
        RangeError,
        SyntaxError,
        ReferenceError,
        Buffer,
        process: {
            version: process.version,
            platform: process.platform,
            arch: process.arch,
            env: {}
        }
    };
    try {
        // Create a VM context
        const context = vm.createContext(sandbox);
        // Execute the code
        const script = new vm.Script(jsCode, {
            filename: 'user-code.js'
        });
        returnValue = script.runInContext(context, {
            timeout: 5000, // 5 second timeout
            breakOnSigint: true
        });
        // If there's a return value and no console output, show the return value
        if (returnValue !== undefined && output.length === 0) {
            output.push(formatValue(returnValue));
        }
    }
    catch (error) {
        errors.push(`Runtime error: ${error.message}`);
        if (error.stack) {
            errors.push(error.stack);
        }
    }
    return { output, errors, returnValue };
}
function formatValue(value) {
    if (value === null)
        return 'null';
    if (value === undefined)
        return 'undefined';
    if (typeof value === 'string')
        return value;
    if (typeof value === 'function')
        return `[Function: ${value.name || 'anonymous'}]`;
    if (typeof value === 'symbol')
        return value.toString();
    if (value instanceof Error)
        return `${value.name}: ${value.message}`;
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value, null, 2);
        }
        catch {
            return String(value);
        }
    }
    return String(value);
}
