var template = function (initStateObj) {
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="helper-bootstrap.css">
            <script>window.APP_INITIAL_STATE = `+JSON.stringify(initStateObj)+`;</script>
            <title>HELPER-INTERNAL</title>
        </head>
        
        <body>
            <div id="root"></div>
        </body>

        <script src="bundle.js"></script>
    </html>
  `;
};

module.exports = template;