# finance-api

A API to simulate an bank account

## 🛠️ Stack

- nodejs: 18 + express
- jest
- supertest
- docker

### Docker version

We develop this boilerplate with the following docker version: `20.10.22`

## :pencil: Features

- :ballot_box_with_check: Cadastrar uma conta
- :ballot_box_with_check: Listar o extrato de uma conta
- :ballot_box_with_check: Listar o extrato por data/período
- :ballot_box_with_check: Realizar um depósito
- :ballot_box_with_check: Realizar um saque
- :ballot_box_with_check: Atualizar dados da conta
- :ballot_box_with_check: Obter dados da conta
- :ballot_box_with_check: Deletar uma conta

## :pencil: Business rules

- :ballot_box_with_check: CPF único
- :ballot_box_with_check: Não pode ser possível realizar depósito em uma conta que não existe
- :ballot_box_with_check: Não pode ser possível realizar um saque de uma conta que não existe
- :ballot_box_with_check: Precisar ter limite suficiente para realizar o saque
- :ballot_box_with_check: Não é possível buscar o extrato de uma conta inexistente
- :ballot_box_with_check: Não é possível deletar uma conta inexistente

## :gem: Run application

```
    npm run docker:build
    npm run docker:run
```

- Open a browser and type the following URL: `http://localhost:49127`

## :gem: Run tests

```
    npm run docker:build
    npm run docker:test
```

## :gem: Prettier

- npm

```
    npx prettier --write .
```

- yarn

```
    yarn prettier --write .
```

## :woman: Author

[@laisfrigerio](https://instagram.com/laisfrigerio/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details
