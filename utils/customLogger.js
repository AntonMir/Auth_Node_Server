/**
 * Логирование запросов в любом методе
 * @param req запрос с фронта
 */

require('colors');

const logger = (req, res, next) => {
    // вывод через объект {}
    // console.log({
    //     URL: req.originalUrl, //EX: /api/user/getdata
    //     method: req.method,
    //     href: req.headers.referer || '',
    //     time: new Date().toUTCString(),
    //     body: req.body,
    //     // Browser: req.headers['user-agent']
    //     // fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    //     // lastURL: req.url, //EX: ../getdata
    // });

    // вывод одной строкой '...'
    console.log(
        '>>> Request: '.gray,
        // '  URL:'.yellow, req.headers.referer || '', 
        '  METHOD:'.yellow, req.method,
        '  PATH:'.yellow, req.originalUrl,    //EX: /api/user/getdata
        '  DATE:'.yellow, new Date().toUTCString(),
        '  BODY:'.yellow, req.body,
        // '  BROWSER:'.yellow, req.headers['user-agent'],
        // '  FromIP:'.yellow, req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        // '  LastURL:'.yellow, req.url     //EX: ../getdata
    );

    next()
}

module.exports = logger