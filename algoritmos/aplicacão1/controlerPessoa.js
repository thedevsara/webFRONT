// importações
import {Pessoa} from "./modelPessoa.js"
let agenda = []
let pos = 0

// Pesquisar
export function pesquisar(nome){
    for(let i = 0;i < agenda.length;i++){
        if (agenda[i].nome == nome){
            return agenda[i]
        }
    }
    return null
}
// Inserir
export function inserir(pessoa){
    agenda[pos] = pessoa
    pos++
}

// excluir
