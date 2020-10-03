export default {
    require: [
        "esm"
    ],
    files: [
        "__tests__/**/*",
        "!__tests__/_config/**/*",
    ],
    serial: true,
    concurrency: 5,
    failFast: true,
    environmentVariables: {
        "AUTH_DOMAIN": "TEST",
        "AUTH_CLIENT_ID": "TEST",
        "AUTH_AUDIENCE": "TEST"
    },
    verbose: true,
    nodeArguments: [
        "--trace-deprecation",
        "--napi-modules"
    ],
    timeout: "8000"
}