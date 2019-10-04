//I - Capturar elementos - addBtn(botão de adicionar), myInput(caixa de texto), listaCaixa(caixa onde será inserido o novo item)

const botaoAdicionar = document.getElementById('addBtn')
// (mãe)
const caixaTexto = document.getElementById('myInput')

const listaCaixa = document.getElementById('listaCaixa')

const erro = document.getElementById('mensagemDeErro')
// criar uma mensagem de erro no html(p)

// let dragging



//II - Inserir um event listener no addBtn (evento "click")
// criar uma li
// inserir o valor do myInput na li
// inserir a li na listaCaixa

botaoAdicionar.addEventListener('click', function (evento) {
    // no botão adicionar coloco uma orelha que irá escutar um evento de click e executar uma função
    evento.preventDefault();
    // essa ação evita que a página seja recarregada
    const mensagem = caixaTexto.value;
    // capturei o conteúdo do input(caixa texto)
    if (mensagem.trim() === "") {
        // se a mensagem for vazia aparece o texto abaixo    
        erro.textContent = "Por favor, escreva um texto!";
        // criei o texto que vai no campo de erro
    } else {
        erro.textContent = ""

        const novoItem = document.createElement('div');
        // criei a div para guardar o 'li' e o 'span', ela precisa ter uma mãe que será a 'ul'(listaCaixa).
        novoItem.setAttribute("class", "drag");

        listaCaixa.appendChild(novoItem)
        // Fase 2 - novoItem que passa a ser filho da lista caixa(id daul)
        const itemDaLista = document.createElement('li');

        itemDaLista.textContent = mensagem
        // aqui peguei o item da lista e coloquei a mensagem do usuário

        // listaCaixa.appendChild(itemDaLista)
        // Fase 1 - eu peguei o elemento mãe (ul-listaCaixa) e coloquei o elemento filho (li).

        novoItem.appendChild(itemDaLista);
        // Fase 2 - itemDaLista vai ganhar nova mãe que é o novoItem.
        itemDaLista.setAttribute("class", 'item_adicionado');
        // criei estilo para o itemDaLista
        itemDaLista.addEventListener('click', function () {
            // criei esse addEventListener para ouvir o click no item da lista e marcar como feita, se o item tem o traço quero que tire e se não tem que marque, agora crio if e else
            if (itemDaLista.classList.contains('item_clicado')) {
                // se o itemDaLista tem uma classe chamanda item_clicado, removo esta classe(linha de baixo)    
                itemDaLista.classList.remove('item_clicado');
            } else {
                itemDaLista.classList.add('item_clicado');
            }


        })
        const fechar = document.createElement('span');

        fechar.textContent = "X";

        itemDaLista.appendChild(fechar);
        fechar.classList.add('fechar')
        // o primeiro fechar é a const criada o span que demos o conteúdo de "x", e o fechar entre parênteses é a classe que está no CSS.
        fechar.addEventListener('click', function () {
            // quando eu clicar no fechar(x) vou excluir o 'li' e o span que estão dentro da div novo item.
            listaCaixa.removeChild(novoItem);

        })

        // Criando os botões:
        const btn = document.getElementById('button');

        const lido = document.getElementById('btnLido');

        const remover = document.getElementById('btnRemover');

        const selecionados = document.getElementById('btnSelecionados');

        lido.addEventListener("click", function (evento) {
            itemDaLista.classList.add('item_clicado');
        })

        remover.addEventListener("click", function (evento) {
            listaCaixa.removeChild(novoItem);
        })

        selecionados.addEventListener("click", function (evento) {
            evento.preventDefault();
            if (itemDaLista.classList.contains("item_clicado")) {
                listaCaixa.removeChild(novoItem);
            }
        })


        // draganddrop
        // Atribuir o draggable para todos os elementos que serão arrastados:
        listaCaixa.setAttribute("draggable", true);
        // minha (ul) é o elemento que irá receber o evento.
        itemDaLista.setAttribute("draggable", true);
        // minha (li)
        novoItem.setAttribute("draggable", true);
        // minhas novas tarefas

        listaCaixa.addEventListener("dragstart", function (ev) {
            // o (ev) acima é um parâmetro da função
            dragging = ev.target.closest(".drag");
            // Declaramos o (dragging lá em cima, linha 12), o valor dele agora é o novoItem que é a caixa mais próxima da (listaCaixa). Conseguimos identificar que é o novoItem através da classe (".drag") que foi declarada na linha 36. 
            // Closest uso esse método para poder identificar a classe mais próxima. Ele só aceita elementos do DOM (classe, id, tag).
        })

        listaCaixa.addEventListener("dragover", function (ev) {
            // dragover eu posso pegar, mas eu agarro e solto, ele faz uma sombrra
            ev.preventDefault();
            // é para evitar o padrão do dragover
            const node = ev.target.closest(".drag")
            // aqui eu crio a sombra do dragging
            this.insertBefore(dragging, node)
        })

        listaCaixa.addEventListener("dragend", function (ev) {
            dragging = null
        })

        caixaTexto.value = ""

    }


})