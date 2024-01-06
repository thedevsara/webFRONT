/* A classe Participante representa um participante da rifa. 
Ela possui um construtor que define as propriedades nome e numero do participante.*/
class Participante {
  constructor(nome, numero) {
    this.nome = nome;
    this.numero = numero;
  }
}
/*A classe 'Rifa', possui um construtor que inicializa várias propriedades da rifa.
vários elementos DOM obtidos usando document.getElementById para fazer referência a um elemento HTML*/
class Rifa {
  constructor() {
    this.numerosTotais = 50; // Quantidade total de números disponíveis
    this.participantes = [];
    this.formulario = document.getElementById('formularioCadastro');
    this.botaoSortear = document.getElementById('botaoSortear');
    this.listaParticipantes = document.getElementById('listaParticipantes');
    this.resultadoDiv = document.getElementById('resultado');
    //retorna uma ação
    this.formulario.addEventListener('submit', this.cadastrarParticipante.bind(this));
    this.botaoSortear.addEventListener('click', this.sortear.bind(this));
  }
  /*O método cadastrarParticipante lida com o envio do formulário de cadastro de participantes. 
  Ele recebe um parâmetro event representando o evento de envio do formulário. 
  Dentro do método, ele obtém os valores digitados nos campos do formulário, 
  valida-os, cria um novo objeto Participante, adiciona-o ao array participantes, atualiza a lista de participantes no DOM, 
  limpa os campos do formulário e exibe uma mensagem de sucesso ou alertas de erro se houver problemas de validação. */
  cadastrarParticipante(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const numero = parseInt(document.getElementById('numero').value);

    if (!nome || isNaN(numero)){
      this.exibirAlerta(`Nome inválido!`)
      return
    }
    if( numero < 1 || numero > this.numerosTotais) {
      this.exibirAlerta(`Informe um número válido entre 1 e ${this.numerosTotais}`);
      return;
    }

    if (!this.validarNome(nome)) {
      this.exibirAlerta('Informe um nome válido (apenas letras)');
      return;
    }

    if (this.verificarDuplicidade(nome, numero)) {
      return;
    }

    const participante = new Participante(nome, numero);
    this.participantes.push(participante);
    this.atualizarListaParticipantes();
    this.limparCampos();
    this.exibirAlerta('Cadastro realizado com sucesso!');
  }
  /*Ele verifica se existem participantes registrados, gera um índice aleatório para selecionar 
    um participante do array participantes,
    recupera o participante selecionado e exibe o resultado do sorteio no DOM.*/
  sortear() {
    if (this.participantes.length === 0) {
      this.exibirResultado('Cadastre pelo menos um participante antes de realizar o sorteio.');
      return;
    }

    const indiceSorteado = Math.floor(Math.random() * this.participantes.length);
    const participanteSorteado = this.participantes[indiceSorteado];
    this.exibirResultado(`Número sorteado: ${participanteSorteado.numero}. Parabéns ${participanteSorteado.nome}!`);
  }
  /*verifica se há duplicidade de nomes ou números de participantes.
  compara o nome e o numero fornecidos com os participantes existentes.*/
  verificarDuplicidade(nome, numero) {
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].nome === nome) {
        alert('Nome já cadastrado!');
        return true; // Duplicidade de nome encontrada
      }

      if (this.participantes[i].numero === numero) {
        alert('Número já escolhido!');
        return true; // Duplicidade de número encontrada
      }
    }
    return false; // Sem duplicidade
  }
  /* Ele usa uma expressão regular (letras),
  para verificar se o nome consiste apenas em letras e espaços. */
  validarNome(nome) {
    const letras = /^[A-Za-z\s]+$/;
    return letras.test(nome);
  }
/*atualiza a lista de participantes no DOM. 
Define o texto do elemento com o nome e número do participante, e adicionando-o à lista de participantes no DOM*/
  atualizarListaParticipantes() {
    this.listaParticipantes.innerHTML = '';
    this.participantes.forEach(participante => {
      const itemLista = document.createElement('li');
      itemLista.textContent = `${participante.nome} (Número: ${participante.numero})`;
      this.listaParticipantes.appendChild(itemLista);
    });
  }
  /*limpa os campos do formulário, definindo seus valores como uma string vazia.*/
  limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('numero').value = '';
  }
  /*exibe uma caixa de alerta com a mensagem fornecida.*/
  exibirAlerta(mensagem) {
    alert(mensagem);
  }
  /* exibe o resultado fornecido no DOM, definindo o conteúdo do elemento resultadoDiv*/
  exibirResultado(resultado) {
    this.resultadoDiv.textContent = resultado;
  }
}

const rifa = new Rifa();
