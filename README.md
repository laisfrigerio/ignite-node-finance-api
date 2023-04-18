# finance-api

A API to simulate an bank account

## 🛠️ Stack

- nodejs: 18 + express
- jest
- supertest
- docker

### Docker version

We develop this project with the following docker version: `20.10.22`

## :pencil: Features

- :ballot_box_with_check: Create an account
- :ballot_box_with_check: Extract from an account
- :ballot_box_with_check: Extract by period
- :ballot_box_with_check: Deposit
- :ballot_box_with_check: Withdraw
- :ballot_box_with_check: Update an account
- :ballot_box_with_check: Retrieve details of an account
- :ballot_box_with_check: Delete an account

## :pencil: Business rules

- :ballot_box_with_check: Unique CPF (brazilian document)
- :ballot_box_with_check: Cannot make a deposit to a non-existent account
- :ballot_box_with_check: Cannot make a withdraw to a non-existent account
- :ballot_box_with_check: You must have enough funds to carry out the withdraw
- :ballot_box_with_check: Cannot fetch statement/operations for non-existent account
- :ballot_box_with_check: Cannot delete a non-existent account

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

```
    npm run prettier:fix
```

## :woman: Author

[@laisfrigerio](https://instagram.com/laisfrigerio/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details
