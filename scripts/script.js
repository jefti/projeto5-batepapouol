axios.defaults.headers.common['Authorization'] = 'dVY1sNGArXuoHRdyAyWGnZGb';


const user = {name: prompt('informe o seu nome por favor:')};
const requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',user);
requisicao.then(resposta);
const senha = setInterval(confirmarlogin, 5000);
let objeto_teste = {} ;
let lista_teste = {};

function deslogar(){
    clearInterval(senha);
}

function confirmarlogin(){
    const confirm = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',user);
    console.log('usuario online...')
}

function resposta(response){
    console.log(`Servidor enviou resposta: ${response}`);
}

function pegarMensagens(){
    pedido_msg = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    pedido_msg.then(exibirmensagens);
}
function exibirmensagens(response){
    console.log('pegamos as mensagens');
    let Lista = response.data;
    let objeto = Lista[1];
    console.log(response.data.length);

    objeto_teste = objeto;
    lista_teste = Lista;

    const tela = document.querySelector('.conteudo');
    Limpartela();

    for(let cont = (Lista.length-1); cont>=0; cont--){
        tela.innerHTML += escreverMensagem(Lista[cont]);
    }
    console.log('telha resetada');
}

function Limpartela(){
    const tela = document.querySelector('.conteudo');
    tela.innerHTML = '';
}

function escreverMensagem(objeto){
    const tipo = objeto.type;
    const remetente = objeto.from;
    const destino = objeto.to;
    const mensagem = objeto.text;
    const hora = objeto.time;
    let texto = '';
    if(tipo == "status"){
        texto = `<div class='mensagem-box login'><div class='mensagem'><span class='horario'>(${hora})</span><span> <strong class='negrito'> ${remetente} </strong> ${mensagem} </span> </div></div>`;
    } else if(tipo =='message'){
        texto = `<div class="mensagem-box">
        <div class="mensagem">
          <span class="horario">(${hora})</span><span> <strong class="negrito"> ${remetente}</strong> para <strong class="negrito">${destino} </strong>: ${mensagem}</span> 
        </div>
      </div>`;
    }
    return texto;
}

function sinonimos(){
let carta = {
        from: user.name,
        to: "Todos",
        text: "E nessa loucura de dizer que não te quero, Vou negando as aparências, Disfarçando as evidências Mas pra que viver fingindo Se eu não posso enganar meu coração? Eu sei que te amo!",
        type: "message" // ou "private_message" para o bônus
    };

    let promessas1 = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',carta);
    promessas1.then(fale);
    promessas1.catch(fale);
}


function fale(resposta){
    console.log(resposta);
}