# Sauce Demo Test

Este projeto contém testes automatizados para o site [Sauce Demo](https://www.saucedemo.com) utilizando [Playwright](https://playwright.dev/) e [TypeScript](https://www.typescriptlang.org/). O objetivo é validar a funcionalidade do site e encontrar bugs que precisam ser corrigidos.

## Padrão Page Object

O padrão _Page Objects_ foi utilizado para organizar o projeto, dessa forma cada página do site é representada por uma classe que encapsula a lógica de interação com os elementos da página. Isso torna a legibilidade do código mais fácil e simplifica a manutenção, pois as mudanças na estrutura da página precisam ser feitas apenas na classe correspondente.

## Estrutura

Com o objetivo de cobrir diferentes cenários, o projeto organiza os testes em pastas por página (cart, inventory e login) e por usuário (error-user, problem-user, standard-user e visual-user). Dessa forma podemos testar e analisar o comportamento da aplicação para cada um dos users, de forma organizada.

## Testes realizados

_Login_: login com sucesso, login com erro e login com delay.
_Inventário_: adicionar produto ao carrinho, remover produto do carrinho, ordenar por nome e ordenar por preço.
_Carrinho_: remover produto do carrinho, botão de continuar comprando e botão de checkout.

### Resumo dos Resultados

- _Total de Testes_: **312**
- _Passou_: **210**
- _Falhou_: **102**
