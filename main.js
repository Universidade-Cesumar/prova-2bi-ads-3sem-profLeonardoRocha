// Arquivo para código javascript

// URL da API (Aqui o aluno colocaria o link do MockAPI dele)
const API_URL = "https://sua-url-aqui.mockapi.io/materiais";

// ==========================================
// SPRINT 2: REGRA DE NEGÓCIO ISOLADA (Obrigatória para o Jest)
// ==========================================
function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    if (quantidadeRetirada > estoqueAtual) return false;
    return true;
}

// ==========================================
// SPRINT 1 E 3: CONSUMO DA API E RENDERIZAÇÃO
// ==========================================
async function buscarEAtualizarInventario() {
    try { 
        // O Jest da Sprint 3 vai procurar exatamente este bloco try/catch

        // Simulando a requisição GET na API (Para rodar o teste visual, usaremos um array fixo, 
        // mas o aluno usaria const resposta = await fetch(API_URL); e dados = await resposta.json();)
        
        const dados = [
            { id: 1, nome: "Luva de Procedimento P", quantidade: 50 },
            { id: 2, nome: "Seringa 10ml", quantidade: 5 } // Vai cair na regra de estoque crítico
        ];

        const lista = document.getElementById('lista-materiais');
        lista.innerHTML = ""; // Limpa a lista antes de renderizar
        
        // Atualiza o Dashboard
        document.getElementById('total-itens').textContent = dados.length;

        dados.forEach(item => {
            const li = document.createElement('li');
            
            // Sprint 3: Regra do estoque crítico (menor que 10)
            if (item.quantidade < 10) {
                li.classList.add('estoque-critico'); 
                li.innerHTML = `<span>⚠️ ${item.nome} (Apenas ${item.quantidade} restantes)</span>`;
            } else {
                li.innerHTML = `<span>${item.nome} (Qtd: ${item.quantidade})</span>`;
            }

            const divAcoes = document.createElement('div');

            // Sprint 2: Botões com as classes exigidas pelo contrato
            const btnBaixar = document.createElement('button');
            btnBaixar.textContent = "Dar Baixa";
            btnBaixar.className = "btn-baixar";
            btnBaixar.onclick = () => alert('Lógica do PUT entraria aqui');
            
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = "Excluir";
            btnExcluir.className = "btn-excluir";
            btnExcluir.onclick = () => alert('Lógica do DELETE entraria aqui');

            divAcoes.appendChild(btnBaixar);
            divAcoes.appendChild(btnExcluir);
            li.appendChild(divAcoes);
            
            lista.appendChild(li);
        });

    } catch (erro) {
        console.error("Erro de conexão com o servidor:", erro);
        alert("Ocorreu um erro ao carregar o inventário.");
    }
}

// ==========================================
// SPRINT 1: CADASTRO DE ITEM
// ==========================================
document.getElementById('btn-cadastrar').addEventListener('click', async () => {
    const nome = document.getElementById('input-nome').value;
    const quantidade = document.getElementById('input-quantidade').value;
    
    try {
        // Lógica do POST com fetch iria aqui...
        console.log(`Simulando envio para a API: ${nome} - Qtd: ${quantidade}`);
        
        // Limpa os campos após enviar
        document.getElementById('input-nome').value = "";
        document.getElementById('input-quantidade').value = "";
        
    } catch (erro) {
        console.error("Erro no cadastro:", erro);
    }
});

// Inicializa a tela carregando os dados do servidor
buscarEAtualizarInventario();