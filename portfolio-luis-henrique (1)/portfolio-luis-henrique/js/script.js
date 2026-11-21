/*
    Uso de IA: utilizei o ChatGPT para auxiliar na organização inicial,
    explicar e montar a estrutura do código do portfólio.
*/

// Lista de projetos que aparece na seção de projetos.
const projetos = [
    {
        titulo: "Clínica Vida Saudável",
        descricao: "Página de uma clínica com apresentação de serviços, profissionais e informações para visitantes.",
        tecnologias: ["HTML", "CSS"],
        link: "",
        textoLink: "Projeto desenvolvido em aula"
    },
    {
        titulo: "Projeto em breve",
        descricao: "Este espaço será usado para apresentar um próximo projeto desenvolvido durante o curso.",
        tecnologias: ["HTML", "CSS"],
        link: "",
        textoLink: "Em breve"
    },
    {
        titulo: "Projeto em breve",
        descricao: "Mais um espaço reservado para mostrar minha evolução em programação.",
        tecnologias: ["JavaScript"],
        link: "",
        textoLink: "Em breve"
    }
];

const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");
const botaoTema = document.getElementById("botaoTema");
const formulario = document.getElementById("formularioContato");
const filtroProjetos = document.getElementById("filtroProjetos");

// Abre e fecha o menu de navegação no celular.
function alternarMenu() {
    const menuEstaAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
    botaoMenu.setAttribute("aria-label", menuEstaAberto ? "Fechar menu" : "Abrir menu");
}

// Fecha o menu depois que uma opção é selecionada.
function fecharMenu() {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
}

// Retorna uma saudação de acordo com a hora recebida.
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde!";
    } else {
        return "Boa noite!";
    }
}

// Alterna entre o tema escuro e o tema claro.
function alternarTema() {
    document.body.classList.toggle("tema-claro");

    const temaClaroAtivo = document.body.classList.contains("tema-claro");
    botaoTema.setAttribute("aria-label", temaClaroAtivo ? "Ativar modo escuro" : "Ativar modo claro");
    botaoTema.textContent = temaClaroAtivo ? "☾" : "☼";
}

// Mostra os projetos na página usando os dados do array.
function mostrarProjetos(lista) {
    const listaProjetos = document.getElementById("listaProjetos");
    listaProjetos.innerHTML = "";

    lista.forEach(function(projeto) {
        const card = document.createElement("article");
        card.classList.add("projeto");

        const titulo = document.createElement("h3");
        titulo.textContent = projeto.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;

        const tecnologias = document.createElement("p");
        tecnologias.classList.add("tecnologias");
        tecnologias.textContent = projeto.tecnologias.join(" · ");

        const link = document.createElement("span");
        link.textContent = projeto.textoLink;

        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(tecnologias);

        if (projeto.link) {
            const ancora = document.createElement("a");
            ancora.href = projeto.link;
            ancora.target = "_blank";
            ancora.rel = "noopener noreferrer";
            ancora.textContent = projeto.textoLink;
            card.appendChild(ancora);
        } else {
            link.classList.add("tecnologias");
            card.appendChild(link);
        }

        listaProjetos.appendChild(card);
    });
}

// Filtra os projetos pela tecnologia selecionada.
function filtrarProjetos() {
    const tecnologiaEscolhida = filtroProjetos.value;

    if (tecnologiaEscolhida === "todos") {
        mostrarProjetos(projetos);
    } else {
        const projetosFiltrados = projetos.filter(function(projeto) {
            return projeto.tecnologias.includes(tecnologiaEscolhida);
        });
        mostrarProjetos(projetosFiltrados);
    }
}

// Verifica os campos e mostra os erros logo abaixo de cada um.
function validarFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const consentimento = document.getElementById("consentimento").checked;

    let formularioValido = true;

    document.getElementById("erroNome").textContent = "";
    document.getElementById("erroEmail").textContent = "";
    document.getElementById("erroMensagem").textContent = "";
    document.getElementById("erroConsentimento").textContent = "";
    document.getElementById("mensagemSucesso").textContent = "";

    if (nome === "") {
        document.getElementById("erroNome").textContent = "Digite seu nome.";
        formularioValido = false;
    }

    if (email === "") {
        document.getElementById("erroEmail").textContent = "Digite seu e-mail.";
        formularioValido = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("erroEmail").textContent = "Digite um e-mail válido.";
        formularioValido = false;
    }

    if (mensagem === "") {
        document.getElementById("erroMensagem").textContent = "Digite uma mensagem.";
        formularioValido = false;
    } else if (mensagem.length < 20) {
        document.getElementById("erroMensagem").textContent = "A mensagem precisa ter pelo menos 20 caracteres.";
        formularioValido = false;
    }

    if (!consentimento) {
        document.getElementById("erroConsentimento").textContent = "Marque o consentimento para continuar.";
        formularioValido = false;
    }

    return formularioValido;
}

// Impede o envio real e mostra uma confirmação quando tudo está correto.
function enviarFormulario(evento) {
    evento.preventDefault();

    if (validarFormulario()) {
        document.getElementById("mensagemSucesso").textContent =
            "Mensagem validada com sucesso! Este formulário é apenas demonstrativo.";
        formulario.reset();
    }
}

// Mostra o ano atual automaticamente no rodapé.
function atualizarAno() {
    document.getElementById("anoAtual").textContent = new Date().getFullYear();
}

// Mostra o botão de voltar ao topo depois que a página rola.
function controlarBotaoTopo() {
    const botaoTopo = document.getElementById("voltarTopo");

    if (window.scrollY > 300) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
}

// Volta a página para o início.
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Configura os eventos e as informações iniciais da página.
function iniciarPagina() {
    const horaAtual = new Date().getHours();
    document.getElementById("saudacao").textContent = obterSaudacao(horaAtual);

    botaoMenu.addEventListener("click", alternarMenu);
    menu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", fecharMenu);
    });

    botaoTema.addEventListener("click", alternarTema);
    formulario.addEventListener("submit", enviarFormulario);
    filtroProjetos.addEventListener("change", filtrarProjetos);
    window.addEventListener("scroll", controlarBotaoTopo);
    document.getElementById("voltarTopo").addEventListener("click", voltarAoTopo);

    mostrarProjetos(projetos);
    atualizarAno();
}

iniciarPagina();
