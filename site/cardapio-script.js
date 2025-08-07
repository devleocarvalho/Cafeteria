document.addEventListener('DOMContentLoaded', () => {
     
    const produtos = [
        { id: 1, categoria: 'bebidas-quentes', nome: 'Expresso', preco: 5.50, imagem: 'https://unsplash.com/pt-br/fotografias/uma-xicara-de-cafe-e-um-biscoito-em-um-pires-YhvnrNOn5mA' },
        { id: 2, categoria: 'bebidas-quentes', nome: 'Cappuccino', preco: 8.00, imagem: 'https://unsplash.com/pt-br/fotografias/cafe-latte-obra-de-arte-VkUP6wWqSvw' },
        { id: 3, categoria: 'bebidas-quentes', nome: 'Latte', preco: 9.50, imagem: 'https://unsplash.com/pt-br/fotografias/uma-pessoa-derramando-leite-em-um-copo-de-vidro-Gp3UiTv4cAI' },
        { id: 4, categoria: 'doces-lanches', nome: 'Bolo de Cenoura', preco: 12.00, imagem: 'https://unsplash.com/pt-br/fotografias/um-bolo-com-cobertura-de-chocolate-xw9d1lm8M_M' },
        { id: 5, categoria: 'doces-lanches', nome: 'Pão de Queijo', preco: 6.00, imagem: 'https://unsplash.com/pt-br/fotografias/bolas-de-pastelaria-no-prato-mOedSrS6qS0' },
        { id: 6, categoria: 'doces-lanches', nome: 'Torta de morango', preco: 15.00, imagem: 'https://unsplash.com/pt-br/fotografias/fatia-de-torta-de-mirtilo-no-prato-aiIANaSK9DQ' },
    ];

    const carrinho = [];

    const renderizarProdutos = () => {
        const bebidasQuentesContainer = document.getElementById('bebidas-quentes');
        const docesLanchesContainer = document.getElementById('doces-lanches');

        produtos.forEach(produto => {
            const produtoCard = document.createElement('div');
            produtoCard.classList.add('produto-card');
            produtoCard.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${produto.id}">Adicionar ao Carrinho</button>
                </div>
            `;

            if (produto.categoria === 'bebidas-quentes') {
                bebidasQuentesContainer.appendChild(produtoCard);
            } else if (produto.categoria === 'doces-lanches') {
                docesLanchesContainer.appendChild(produtoCard);
            }
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', adicionarAoCarrinho);
        });
    };

    const adicionarAoCarrinho = (event) => {
        const produtoId = parseInt(event.target.dataset.id);
        const produto = produtos.find(p => p.id === produtoId);
        if (produto) {
            carrinho.push(produto);
            renderizarCarrinho();
        }
    };

    const renderizarCarrinho = () => {
        const cartItemsList = document.getElementById('cart-items');
        const cartTotalValue = document.getElementById('cart-total-value');
        cartItemsList.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.preco;
        });

        cartTotalValue.textContent = total.toFixed(2);
    };

    renderizarProdutos();
});