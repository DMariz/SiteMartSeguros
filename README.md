# Mart Seguros Website

![Mart Seguros Logo](assets/images/LogoMS.png)

**Mart Seguros** é uma corretora de seguros comprometida em oferecer as melhores soluções para você e sua família. Este repositório contém o código-fonte do site oficial da Mart Seguros, desenvolvido para proporcionar uma experiência intuitiva e eficiente para os visitantes interessados em conhecer os produtos e serviços oferecidos.

## Índice

- [Visão Geral](#visão-geral)
- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração e Instalação](#configuração-e-instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Passo a Passo](#passo-a-passo)
- [Configuração do EmailJS](#configuração-do-emailjs)
- [Utilização dos Formulários](#utilização-dos-formulários)
- [Personalização](#personalização)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

Este site foi desenvolvido com foco na usabilidade e responsividade, garantindo que os usuários tenham uma experiência consistente em dispositivos móveis e desktops. Ele inclui seções informativas sobre os produtos, parceiros, e oferece formulários para contato e solicitação de orçamento, facilitando a comunicação entre a Mart Seguros e seus clientes.

## Características

- **Design Responsivo:** Compatível com dispositivos móveis e desktops.
- **Carrossel de Imagens:** Utiliza o Slick Carousel para apresentar banners e parceiros de forma dinâmica.
- **Animações:** Implementadas com AOS (Animate on Scroll) para uma experiência visual atraente.
- **Formulários de Contato e Orçamento:** Envio de mensagens via EmailJS sem recarregar a página.
- **Modais para Parceiros:** Exibição de informações detalhadas sobre parceiros em janelas modais.
- **Menu Mobile:** Menu de navegação adaptável para dispositivos móveis.

## Tecnologias Utilizadas

- **HTML5 & CSS3:** Estrutura e estilização do site.
- **JavaScript (ES6):** Lógica de interação e manipulação de formulários.
- **jQuery:** Facilita a manipulação do DOM e integração com plugins.
- **Bootstrap 4:** Framework CSS para design responsivo e componentes prontos.
- **Slick Carousel:** Plugin para criação de carrosséis de imagens.
- **AOS (Animate on Scroll):** Biblioteca para adicionar animações durante o scroll.
- **EmailJS:** Serviço para envio de emails a partir de formulários sem backend.
- **FontAwesome:** Ícones utilizados no site.

## Estrutura do Projeto

```
mart-seguros-website/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── LogoMS.png
│   │   ├── slide_01.jpg
│   │   ├── slide_02.jpg
│   │   ├── slide_03.jpg
│   │   ├── service_01.jpg
│   │   ├── service_02.jpg
│   │   ├── service_03.jpg
│   │   ├── logos/
│   │   │   ├── logo-allianz.png
│   │   │   ├── logo-hdi-seguros.png
│   │   │   ├── logo-mapfre.png
│   │   │   ├── logo-portoseguro.png
│   │   │   ├── logo-sulamerica.png
│   │   │   └── logo-tokio-marine.png
│   └── js/
│       └── script.js
├── index.html
└── README.md
```

## Configuração e Instalação

### Pré-requisitos

Para executar este projeto localmente, você precisará de:

- **Navegador Web Moderno:** Como Google Chrome, Mozilla Firefox, Safari ou Edge.
- **Servidor Local (Opcional):** Embora o site possa ser aberto diretamente no navegador, utilizar um servidor local facilita testes e integração com serviços como EmailJS.

### Passo a Passo

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/mart-seguros-website.git
   ```

2. **Navegar para o Diretório do Projeto:**

   ```bash
   cd mart-seguros-website
   ```

3. **Abrir o Arquivo HTML no Navegador:**

   Você pode abrir diretamente o arquivo `index.html` no seu navegador ou utilizar um servidor local.

   - **Abrir Diretamente:**
     - Navegue até a pasta do projeto.
     - Clique duas vezes no arquivo `index.html`.

   - **Usar um Servidor Local (Recomendado):**
     - **Usando o VS Code com a Extensão Live Server:**
       - Abra o projeto no VS Code.
       - Clique com o botão direito no `index.html` e selecione "Open with Live Server".

     - **Usando o Python (Caso tenha o Python instalado):**
       - Para Python 3:

         ```bash
         python -m http.server 8000
         ```

       - Acesse `http://localhost:8000` no navegador.

## Configuração do EmailJS

Para que os formulários de contato e orçamento funcionem corretamente, é necessário configurar o EmailJS. Siga os passos abaixo para integrar o EmailJS ao seu projeto:

1. **Criar uma Conta no EmailJS:**

   - Acesse [EmailJS](https://www.emailjs.com/) e crie uma conta gratuita.

2. **Adicionar um Serviço de Email:**

   - No painel do EmailJS, clique em "Add Service" e selecione o provedor de email que deseja usar (por exemplo, Gmail, Yahoo, Outlook).
   - Siga as instruções para conectar sua conta de email.

3. **Criar um Template de Email:**

   - No painel do EmailJS, vá para "Email Templates" e clique em "Create New Template".
   - Configure os campos do template conforme os dados que serão enviados pelos formulários. Por exemplo:

     ```html
     Subject: Nova mensagem de {{from_name}}

     Nome: {{from_name}}
     Email: {{from_email}}
     Telefone: {{phone}}
     Mensagem:
     {{message}}
     ```

4. **Obter os IDs Necessários:**

   - **Service ID:** Encontre o ID do serviço que você adicionou.
   - **Template ID:** Encontre o ID do template que você criou.
   - **User ID (Chave Pública):** Encontre sua chave pública no painel do EmailJS.

5. **Atualizar o Código JavaScript:**

   Abra o arquivo `assets/js/script.js` e substitua os placeholders pelos IDs reais:

   ```javascript
   // Inicialização do EmailJS com sua chave pública
   emailjs.init("SUA_CHAVE_PÚBLICA"); 
   
   // Função para enviar o email
   emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', { 
       from_name: data.nome,
       from_email: data.email,
       phone: data.telefone || 'Não fornecido',
       message: data.mensagem
   })
   ```

6. **Garantir a Ordem Correta dos Scripts:**

   No arquivo `index.html`, certifique-se de que a biblioteca EmailJS é carregada antes do seu script personalizado:

   ```html
   <!-- EmailJS -->
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   <script type="text/javascript">
     emailjs.init('SUA_CHAVE_PÚBLICA');
   </script>
   
   <!-- Seu JavaScript personalizado -->
   <script src="assets/js/script.js"></script>
   ```

7. **Testar os Formulários:**

   - Abra o site no navegador.
   - Preencha os formulários de "Contato" e "Solicitar Orçamento".
   - Envie as mensagens e verifique se os emails estão sendo recebidos conforme configurado.

## Utilização dos Formulários

O site possui dois formulários principais:

1. **Formulário de Solicitação de Orçamento (`orcamento-form`):**

   - **Campos:**
     - Nome
     - Email
     - Telefone
     - Mensagem
   - **Validação:**
     - Todos os campos são obrigatórios.
   - **Feedback ao Usuário:**
     - Mensagem de sucesso ou erro exibida abaixo do formulário.

2. **Formulário de Contato (`contato-form`):**

   - **Campos:**
     - Nome
     - Email
     - Telefone (opcional)
     - Mensagem
   - **Validação:**
     - Nome, Email e Mensagem são obrigatórios.
     - Telefone é opcional.
   - **Feedback ao Usuário:**
     - Mensagem de sucesso ou erro exibida abaixo do formulário.

**Funcionamento:**

- **Validação:** Antes de enviar os dados, o JavaScript valida se os campos obrigatórios estão preenchidos.
- **Envio via EmailJS:** Os dados são enviados para o EmailJS, que processa e envia para o email configurado.
- **Prevenção de Recarregamento:** A página não recarrega após o envio; em vez disso, exibe uma mensagem de feedback.

## Personalização

### Estilização

- **CSS Personalizado:**
  - O arquivo `assets/css/style.css` contém todas as estilizações personalizadas.
  - Você pode modificar este arquivo para ajustar cores, fontes, layouts e outras propriedades visuais.

### Conteúdo

- **Textos e Imagens:**
  - Substitua os textos e imagens presentes na pasta `assets/images/` conforme necessário para refletir informações atualizadas ou específicas.

### Adicionar/Remover Parceiros

- **Modais:**
  - Cada parceiro possui um modal com informações detalhadas.
  - Para adicionar um novo parceiro:
    1. Adicione uma nova `<div class="col-md-4 col-sm-6 mb-4">` na seção de parceiros.
    2. Crie um novo modal seguindo o padrão dos existentes, com um ID único.
    3. Atualize o botão "Ver Mais" para apontar para o novo modal.

## Contribuição

Atualmente, este projeto é específico para a Mart Seguros. Caso deseje contribuir ou sugerir melhorias, entre em contato com o administrador do projeto.

## Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para utilizá-lo e modificá-lo conforme necessário.

## Contato

Para dúvidas, sugestões ou suporte, entre em contato:

- **Email:** [contato@martseguros.com.br](mailto:contato@martseguros.com.br)
- **WhatsApp:** [+55 (81) 99391-4440](https://api.whatsapp.com/send?phone=5581993914440)
- **Endereço:**
  - Rua Exemplo, 123 - Centro
  - Cidade - Estado

---

**Desenvolvido por [Seu Nome](https://github.com/seu-usuario)**

---

## Capturas de Tela

*(Opcional: Adicione capturas de tela do site para referência visual)*

![Página Inicial](assets/images/screenshot-home.png)
![Formulário de Contato](assets/images/screenshot-contato.png)
![Modal Parceiro](assets/images/screenshot-modal.png)

---

## Agradecimentos

Agradecemos as seguintes bibliotecas e serviços que tornaram este projeto possível:

- [Bootstrap](https://getbootstrap.com/)
- [Slick Carousel](https://kenwheeler.github.io/slick/)
- [AOS](https://michalsnik.github.io/aos/)
- [EmailJS](https://www.emailjs.com/)
- [FontAwesome](https://fontawesome.com/)

---

**Nota:** Certifique-se de substituir os placeholders (como `'SUA_CHAVE_PÚBLICA'`, `'SEU_SERVICE_ID'`, `'SEU_TEMPLATE_ID'`, e `[Seu Nome](https://github.com/seu-usuario)`) com as informações reais correspondentes ao seu projeto.
