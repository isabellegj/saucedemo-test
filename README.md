# Sauce Demo Test

Este projeto contém testes automatizados para o site [Sauce Demo](https://www.saucedemo.com) utilizando [Playwright](https://playwright.dev/) e [TypeScript](https://www.typescriptlang.org/). O objetivo é validar a funcionalidade do site e encontrar bugs que precisam ser corrigidos.

## Padrão Page Object

O padrão _Page Objects_ foi utilizado para organizar o projeto, dessa forma cada página do site é representada por uma classe que encapsula a lógica de interação com os elementos da página. Isso torna a legibilidade do código mais fácil e simplifica a manutenção, pois as mudanças na estrutura da página precisam ser feitas apenas na classe correspondente.

## Estrutura

Com o objetivo de cobrir diferentes cenários, o projeto organiza os testes em pastas por página (cart, inventory e login) e por usuário (error-user, problem-user, standard-user e visual-user). Dessa forma podemos testar e analisar o comportamento da aplicação para cada um dos users, de forma organizada.

## Resultados **FAILED**

Nos testes delay-login.spec.ts e /inventory/problem-user/product-image.spec.ts usei o test.fail(), pois todos os testes em ambas as suítes deverão falhar.
Nos outros casos, os testes deram resultados mesclados, o que possibilita observar em quais produtos e users exatos os erros ocorrem.

## Mapeamento de Testes

| Página    | Teste                         | Descrição                                                                                 | Status    |
| --------- | ----------------------------- | ----------------------------------------------------------------------------------------- | --------- |
| Login     | Login com sucesso             | Garantir que o site faz login corretamente com user e password                            | Concluído |
| Login     | Login com delay               | Verificar se o login acontece em menos de 5s com performance_gitch_user                   | Concluído |
| Login     | Login com erro                | Verificar se o login não acontece com usuários aleatórios e com o locked_out_user         | Concluído |
| Inventory | Imagens dos produtos          | Garantir que as imagens não sejam o cachorro                                              | Concluído |
| Inventory | Nome dos produtos             | Garantir que os nomes dos produtos comecem com Suce Labs                                  | Concluído |
| Inventory | Adicionar produto ao carrinho | Garantir que cada um dos produtos seja adicionado ao carrinho                             | Concluído |
| Cart      | Remover produto do carrinho   | Garantir que cada um dos produtos seja removido do carrinho                               | Concluído |
| Inventory | Ordenar produtos por nome     | Garantir que a ordenação por nome A - Z e Z - A ocorra corretamente                       | Concluído |
| Inventory | Ordenar produtos por preço    | Garantir que a ordenação por preço low - high e high - low ocorra corretamente            | Concluído |
| Cart      | Remover produto do carrinho   | Garantir que cada um dos produtos seja removido do carrinho                               | Concluído |
| Cart      | Botão "continue shopping"     | Garantir que ao clicar no botão o usuário seja redirecionado à página Inventory           | Concluído |
| Cart      | Botão "checkout"              | Garantir que ao clicar no botão o usuário seja redirecionado à primeira etapa de checkout | Concluído |
| Inventory | Descrição do produto          | Garantir que a descrição esteja correta                                                   | Pendente  |
| Inventory | Menu hamburguer               | Garantir que ao clicar no botão o menu abra corretamente                                  | Pendente  |
| Menu      | Fechar menu hamburguer        | Garantir que ao clicar no X o menu feche corretamente                                     | Pendente  |
| Menu      | Opções do menu hamburguer     | Verificar se cada uma das opções do menu funciona corretamente                            | Pendente  |
| Checkout  | Formulário checkout           | Verificar se ao preencher e enviar o form o usuário é redirecionado à tela de checkout 2  | Pendente  |
| Checkout  | Formulário checkout erro      | Garantir que o formulário apresente os erros caso o usuário não preencha os campos        | Pendente  |
| Checkout  | Botão "finish"                | Garantir que ao clicar no botão o usuário seja redirecionado à tela de checkout complete  | Pendente  |
| Checkout  | Botão "back home"             | Garantir que ao clicar no botão o usuário seja redirecionado à tela de Inventory          | Pendente  |
| Inventory | Detalhe do produto            | Garantir que ao clicar no nome do produto o usuário seja redirecionado à tela de detalhe  | Pendente  |
