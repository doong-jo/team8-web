const template = function (initStateObj) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="https://175.123.140.145/helper-bootstrap.css">
            <script>window.APP_INITIAL_STATE = `+JSON.stringify(initStateObj)+`;</script>
            <title>HELPER-INTERNAL</title>
        </head>
        
        <body>
            <div id="root"></div>
        </body>

        <script src="https://175.123.140.145/bundle.js"></script>
    </html>
  `;
};

module.exports = template;