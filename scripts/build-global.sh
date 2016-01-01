# Here we use webpack to build a UMD (Universal Module Definition) module that
# will put the exports of your package entrypoint onto the the global scope
# (`window` in a browser, for example)
webpack --progress --colors --output-library-target umd src/index.js global.js --output-library motor
