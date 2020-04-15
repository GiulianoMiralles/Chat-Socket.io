function index(request, response) {
    response.render('index.pug');
};

function chat(request, response) {
    response.render('chat')

};


//Exporto las funciones
module.exports = {
    index,
    chat
};