module.exports = {
	"env": {
		"browser": true,
		"es2020": true,
    "node": true,
	"jquery": true
	},
	// Check the default rules, see https://eslint.org/docs/rules/
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"rules": {
		// Prefer double quotes
		"quotes": ["warn", "double", { "avoidEscape": true }],
		// All instructions must end with semicolons
		"semi": ["error", "always"],
		// Indent with tabs
		"indent": ["warn", "tab"],
		// Force Unix new-lines
		"linebreak-style": ["warn", "windows"],
		// Force strict mode
		"strict": ["error", "safe"],
		// Force curly-braces style
		//"curly": ["warn", "multi-or-nest"],
		// Default case always must be last one
		"default-case-last": "error",
		// Use === or !== instead of == or !=
		"eqeqeq": ["error", "smart"],
		// Allow only one class per file
		//"max-classes-per-file": "warn",
		// No empty functions, at least a comment is needed
		"no-empty-function": "warn",
		// Eval function is dangerous and slow
		"no-eval": "error",
		// Avoid extend native objects
		"no-extend-native": "error",
		// Avoid vars in loops that returns functions
		"no-loop-func": "error",
		// Avoid multiline strings with backslash
		"no-multi-str": "error",
		// Avoid javascript: pseudoprotocol within .js files
		"no-script-url": "error",
		// Avoid comparing a variable with itself
		"no-self-compare": "error",
		// Avoid loops that do not change condition
		"no-unmodified-loop-condition": "warn",
		// Avoid unused expressions
		"no-unused-expressions": ["warn", { "allowShortCircuit": true, "allowTernary": true }],
		// Throw error in promises instead of reject
		"prefer-promise-reject-errors": ["error", {"allowEmptyReject": true}],
		// Do not allow var declarations, use let or const instead
		"no-var": "error",
		// Prefer const if variable is not changed within the program
		"prefer-const": "warn"
	}
};