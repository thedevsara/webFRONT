// importações
import {inserir, pesquisar} from "./controlerPessoa.js"
import {Pessoa} from "./modelPessoa.js"

// Botão Salvar
let btSalvar = document.getElementById("btSalvar")
btSalvar.addEventListener("click", () => {
    let novaPessoa = new Pessoa()
    novaPessoa.nome = document.getElementById("nome").value
    novaPessoa.idade = document.getElementById("idade").value
    novaPessoa.cidade = document.getElementById("cidade").value
    novaPessoa.telefone = document.getElementById("telefone").value
    inserir(novaPessoa)
    console.log(novaPessoa)
    limpar()
});

// Botão Pesquisar
let btPesq = document.getElementById("btPesq")
btPesq.addEventListener("click", () => {
  let nome = document.getElementById("nome").value  
  let pessoa = pesquisar(nome)
  if (pessoa != null){
    document.getElementById("idade").value = pessoa.idade
    document.getElementById("cidade").value = pessoa.cidade
    document.getElementById("telefone").value = pessoa.telefone  
  } else { 
    alert("Pessoa não encontrada")
    limpar()
  }
});
// Limpar
function limpar(){
    document.getElementById("nome").value = ""
    document.getElementById("idade").value = ""
    document.getElementById("cidade").value = ""
    document.getElementById("telefone").value = ""  
}

