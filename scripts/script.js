axios.defaults.headers.common['Authorization'] = 'dVY1sNGArXuoHRdyAyWGnZGb';


const user = {name: prompt('informe o seu nome por favor:')};
const requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',user);
requisicao.then(resposta);
const senha = setInterval(confirmarlogin, 5000);


function deslogar(){
    clearInterval(senha);
}

function confirmarlogin(){
    const confirm = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',user);
}

function resposta(response){
    console.log(`Servidor enviou resposta: ${response}`);
}

function pegarMensagens(){
    pedido_msg = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    pedido_msg.then(exibirmensagens);
}
function exibirmensagens(response){
    const Lista = response;
    console.log(Lista);
}