var template = function (initStateObj) {
  return `
    <!DOCTYPE html>
    <html>
        <head>
<<<<<<< Updated upstream
            <link rel="stylesheet" href="helper-bootstrap.css">
=======
            <link rel="stylesheet" href="http://175.123.140.145/helper-bootstrap.css">
>>>>>>> Stashed changes
            <script>window.APP_INITIAL_STATE = `+JSON.stringify(initStateObj)+`;</script>
            <title>TEAM EIGHT</title>
        </head>
        
        <body>
            <div id="root"></div>
        </body>

<<<<<<< Updated upstream
        <script src="bundle.js"></script>
=======
        <script src="http://175.123.140.145/bundle.js"></script>
>>>>>>> Stashed changes
    </html>
  `;
};

module.exports = template;