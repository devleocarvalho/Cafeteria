document.addEventListener('DOMContentLoaded', () => {
     
    const produtos = [
        { id: 1, categoria: 'bebidas-quentes', nome: 'Expresso', preco: 5.50, imagem: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800' },
        { id: 2, categoria: 'bebidas-quentes', nome: 'Cappuccino', preco: 8.00, imagem: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800' },
        { id: 3, categoria: 'bebidas-quentes', nome: 'Latte', preco: 9.50, imagem: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800' },
        { id: 4, categoria: 'bebidas-quentes', nome: 'Mocha', preco: 11.00, imagem: 'https://images.unsplash.com/photo-1442115994353-2d450c446da7?auto=format&fit=crop&q=80&w=800' },
        { id: 5, categoria: 'bebidas-quentes', nome: 'Macchiato', preco: 10.00, imagem: 'https://images.unsplash.com/photo-1557006021-b85faa2ba5f2?auto=format&fit=crop&q=80&w=800' },
        { id: 6, categoria: 'bebidas-quentes', nome: 'Chá de Hibisco', preco: 7.50, imagem: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800' },
        { id: 7, categoria: 'doces-lanches', nome: 'Bolo de Cenoura', preco: 12.00, imagem: 'https://images.unsplash.com/photo-1622921491193-278859367ca7?auto=format&fit=crop&q=80&w=800' },
        { id: 8, categoria: 'doces-lanches', nome: 'Pão de Queijo', preco: 6.00, imagem: 'https://images.unsplash.com/photo-1598103442097-8b433433367d?auto=format&fit=crop&q=80&w=800' },
        { id: 9, categoria: 'doces-lanches', nome: 'Torta de Morango', preco: 15.00, imagem: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800' },
        { id: 10, categoria: 'doces-lanches', nome: 'Croissant', preco: 9.00, imagem: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800' },
        { id: 11, categoria: 'doces-lanches', nome: 'Cheesecake', preco: 14.00, imagem: 'https://images.unsplash.com/photo-1524351199679-46cddfdb50c7?auto=format&fit=crop&q=80&w=800' },
        { id: 12, categoria: 'doces-lanches', nome: 'Cookie de Chocolate', preco: 7.00, imagem: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800' },
    ];

    let carrinho = [];
    
    // Identifica a mesa via URL (Ex: cardapio.html?mesa=5)
    const urlParams = new URLSearchParams(window.location.search);
    const mesaUrl = urlParams.get('mesa');

    const renderizarProdutos = () => {
        const bebidasQuentesContainer = document.getElementById('bebidas-quentes');
        const docesLanchesContainer = document.getElementById('doces-lanches');

        produtos.forEach(produto => {
            const produtoCard = document.createElement('div');
            produtoCard.classList.add('produto-card');
            produtoCard.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'">
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
        const cartActions = document.getElementById('cart-actions');
        cartItemsList.innerHTML = '';
        cartActions.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const li = document.createElement('li');
            // Adiciona um botão para remover o item
            li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button class="remove-from-cart" data-id="${item.id}">X</button>`;
            cartItemsList.appendChild(li);
            total += item.preco;
        });

        cartTotalValue.textContent = total.toFixed(2);

        // Adiciona ações apenas se o carrinho não estiver vazio
        if (carrinho.length > 0) {
            cartActions.innerHTML = `
                ${mesaUrl ? 
                    `<div class="mesa-input-container">
                        <strong>Mesa Identificada: ${mesaUrl}</strong>
                        <input type="hidden" id="mesa-numero" value="${mesaUrl}">
                     </div>` 
                    : 
                    `<div class="mesa-input-container">
                        <label for="mesa-numero">Nº da Mesa:</label>
                        <input type="number" id="mesa-numero" min="1" placeholder="Ex: 5" required>
                     </div>`
                }
                <button class="add-to-cart" style="width:100%; margin-bottom:10px; background-color:#2980b9;" onclick="abrirPagamento()">Pagar Agora</button>
                <button id="checkout-button" class="finalizar-pedido-btn">Finalizar Pedido</button>
            `;
            document.getElementById('checkout-button').addEventListener('click', finalizarPedido);
        }

        // Adiciona evento aos botões de remover
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removerDoCarrinho);
        });
    };

    const removerDoCarrinho = (event) => {
        const produtoId = parseInt(event.target.dataset.id);
        const itemIndex = carrinho.findIndex(p => p.id === produtoId);
        if (itemIndex > -1) {
            carrinho.splice(itemIndex, 1);
            renderizarCarrinho();
        }
    };

    const atualizarStatusMesa = (numeroMesa, novoStatus) => {
        const mesasDefault = [
            { id: 1, status: 'livre' }, { id: 2, status: 'livre' }, { id: 3, status: 'livre' },
            { id: 4, status: 'livre' }, { id: 5, status: 'livre' }, { id: 6, status: 'livre' }
        ];
        
        let mesas = JSON.parse(localStorage.getItem('mesas'));
        if (!mesas) {
            mesas = mesasDefault;
        }

        const mesaIndex = mesas.findIndex(m => m.id === parseInt(numeroMesa));
        if (mesaIndex > -1) {
            mesas[mesaIndex].status = novoStatus;
            localStorage.setItem('mesas', JSON.stringify(mesas));
        }
    };

    const finalizarPedido = () => {
        const numeroMesa = document.getElementById('mesa-numero').value;
        if (!numeroMesa) {
            alert('Por favor, informe o número da sua mesa.');
            return;
        }

        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
        const novoPedido = { id: Date.now(), mesa: parseInt(numeroMesa), itens: carrinho, total: total, status: 'preparo', hora: new Date() };
        
        pedidos.push(novoPedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        atualizarStatusMesa(numeroMesa, 'ocupada');

        alert(`Pedido para a mesa ${numeroMesa} enviado para a cozinha!`);
        carrinho = [];
        renderizarCarrinho();
    };

    renderizarProdutos();

    // --- Funções Globais (acessíveis via onclick no HTML) ---

    window.chamarGarcom = () => {
        const mesa = mesaUrl || prompt("Por favor, informe o número da sua mesa:");
        if(mesa) {
            const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
            solicitacoes.push({
                tipo: 'garcom',
                mesa: mesa,
                hora: new Date(),
                resolvido: false
            });
            localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
            alert("O garçom foi chamado! Aguarde um instante.");
        }
    };

    window.abrirPagamento = () => {
        const mesa = document.getElementById('mesa-numero').value;
        if(!mesa) { alert("Identifique a mesa primeiro."); return; }
        
        const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
        
        document.getElementById('modal-mesa').textContent = mesa;
        document.getElementById('modal-total').textContent = total.toFixed(2);
        document.getElementById('payment-modal').style.display = 'flex';
    };

    window.fecharModal = () => {
        document.getElementById('payment-modal').style.display = 'none';
    };

    window.confirmarPagamento = () => {
        const mesa = document.getElementById('mesa-numero').value;
        const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
        
        // Salva o pedido como "pago" diretamente
        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        const novoPedido = { 
            id: Date.now(), 
            mesa: parseInt(mesa), 
            itens: carrinho, 
            total: total, 
            status: 'pago', // Já entra como pago
            hora: new Date() 
        };
        pedidos.push(novoPedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        atualizarStatusMesa(mesa, 'ocupada');

        alert("Pagamento confirmado! Seu pedido será preparado.");
        carrinho = [];
        renderizarCarrinho();
        fecharModal();
    };

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('overflow-hidden');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }
});