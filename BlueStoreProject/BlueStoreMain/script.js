const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sQtd = document.querySelector('#m-qtd')
const sPreco = document.querySelector('#m-preco')
const sCor = document.querySelector('#m-cor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sQtd.value = itens[index].qtd
    sPreco.value = itens[index].preco
    sCor.value = itens[index].cor
    id = index
  } else {
    sNome.value = ''
    sQtd.value = ''
    sPreco.value = ''
    sCor.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.qtd}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.cor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sQtd.value == '' || sPreco.value == '' || sCor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].qtd = sQtd.value
    itens[id].preco = sPreco.value
    itens[id].cor = sCor.value
  } else {
    itens.push({'nome': sNome.value, 'qtd': sQtd.value, 'preco': sPreco.value, 'cor': sCor.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
//Feito por Davi Alves Rodrigues e João Vitor de Sousa Cunha