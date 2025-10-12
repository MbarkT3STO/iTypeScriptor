import { transform } from 'esbuild';
import * as vm from 'vm';

interface ExecutionResult {
  output: string[];
  errors: string[];
  returnValue: any;
}

export async function executeCode(code: string, language: string): Promise<ExecutionResult> {
  const output: string[] = [];
  const errors: string[] = [];
  let returnValue: any;

  // Transform TypeScript to JavaScript if needed
  let jsCode = code;
  if (language === 'typescript') {
    try {
      const result = await transform(code, {
        loader: 'ts',
        target: 'es2020',
        format: 'cjs'
      });
      jsCode = result.code;
    } catch (error: any) {
      errors.push(`TypeScript compilation error: ${error.message}`);
      return { output, errors, returnValue: undefined };
    }
  }

  // Create a custom console object to capture output
  const customConsole = {
    log: (...args: any[]) => {
      output.push(args.map(arg => formatValue(arg)).join(' '));
    },
    error: (...args: any[]) => {
      errors.push(args.map(arg => formatValue(arg)).join(' '));
    },
    warn: (...args: any[]) => {
      output.push(`⚠️ ${args.map(arg => formatValue(arg)).join(' ')}`);
    },
    info: (...args: any[]) => {
      output.push(`ℹ️ ${args.map(arg => formatValue(arg)).join(' ')}`);
    },
    debug: (...args: any[]) => {
      output.push(`🐛 ${args.map(arg => formatValue(arg)).join(' ')}`);
    },
    clear: () => {
      output.length = 0;
      errors.length = 0;
    },
    table: (data: any) => {
      output.push(JSON.stringify(data, null, 2));
    },
    dir: (obj: any) => {
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

  } catch (error: any) {
    errors.push(`Runtime error: ${error.message}`);
    if (error.stack) {
      errors.push(error.stack);
    }
  }

  return { output, errors, returnValue };
}

function formatValue(value: any): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`;
  if (typeof value === 'symbol') return value.toString();
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

