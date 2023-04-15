//1. CAdastramos as informações necessárias para contatar o Servidor:
axios.defaults.headers.common['Authorization'] = 'dVY1sNGArXuoHRdyAyWGnZGb';

//2 O usuario tenta logar com seu proprio nome
const user = {name: prompt('informe o seu nome por favor:')};
const requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',user);
requisicao.then(resposta);
requisicao.catch(outroNome);

//3 manter o contato com o servidor para confirmar status e resetar tela
const senha = setInterval(confirmarlogin, 5000);
const chavesMensagens = setInterval(pegarMensagens, 3000);

let objeto_teste = {} ;
let lista_teste = {};


function outroNome(){
    user.name = prompt('O primeiro nome falhou, insira outro nome:');
    const requisicao2 = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',user);
    requisicao2.then(resposta);
    requisicao2.catch(outroNome);

    // o usuario insere o nome
    // tentamos conectar no servidor com esse nome
    // se verdedeiro o código continua
    //se falso voltamos ao começo
}




document.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        enviarMensagem();
    }
});


function deslogar(){
    clearInterval(senha);
    clearInterval(chavesMensagens);
}

function confirmarlogin(){
    const confirm = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',user);
    //console.log('usuario online...');
}

function resposta(response){
    console.log(`Servidor enviou resposta: ${response}`);
    pegarMensagens();
}

function pegarMensagens(){
    pedido_msg = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    pedido_msg.then(exibirmensagens);
}
function exibirmensagens(response){
    //console.log('pegamos as mensagens');
    let Lista = response.data;
    let objeto = Lista[1];
    //console.log(response.data.length);

    objeto_teste = objeto;
    lista_teste = Lista;

    const tela = document.querySelector('.conteudo');
    Limpartela();

    for(let cont = 0; cont < Lista.length; cont++){
        tela.innerHTML += escreverMensagem(Lista[cont]);
    }
    //console.log('Mensagens atualizadas ...');
    let Lista_mensagens = document.querySelectorAll('.mensagem-box');
    let primeiro = Lista_mensagens[(Lista_mensagens.length -1)];
    primeiro.scrollIntoView();
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
        texto = `<div data-test="message" class='mensagem-box login'><div class='mensagem'><span class='horario'>(${hora})</span><span> <strong class='negrito'> ${remetente} </strong> ${mensagem} </span> </div></div>`;
    } else if(tipo =='message'){
        texto = `<div data-test="message" class="mensagem-box">
        <div class="mensagem">
          <span class="horario">(${hora})</span><span> <strong class="negrito"> ${remetente}</strong> para <strong class="negrito">${destino} </strong>: ${mensagem}</span> 
        </div>
      </div>`;
    } else if(tipo == 'private_message'){
        texto = `
        <div data-test="message" class="mensagem-box reservada">
        <div class="mensagem">
          <span class="horario">(${hora})</span><span> <strong class="negrito"> ${remetente}</strong> reservadamente para <strong class="negrito">${destino} </strong>: ${mensagem}</span> 
        </div>
      </div>
        `
    }
    return texto;
}

function mandarCarta(mensagem){
let carta = {
        from: user.name,
        to: "Todos",
        text: mensagem,
        type: "message" // ou "private_message" para o bônus
    };

    let promessas1 = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',carta);
    promessas1.then(fale);
    promessas1.catch(falhaMensagem);
}


function fale(resposta){
    console.log(resposta);
    pegarMensagens();
}

function falhaMensagem(){
    alert('Houve um problema no servidor que desligou o usuario, por favor refaça o login');
    window.location.reload();
}

function enviarMensagem(){
    console.log('enviando');
    let texto = document.querySelector('.caixa_texto');
    mandarCarta(texto.value);
    texto.value = '';
    console.log('mensagem enviada para o servidor');
}