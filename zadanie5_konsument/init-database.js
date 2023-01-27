
db.categories.insertMany([
    {
        name: 'Books'
    },
    {
        name: 'Movies'
    },
    {
        name: 'Games'
    }
]);

const booksID = db.categories.findOne({name: 'Books'})._id
const moviesID = db.categories.findOne({name: 'Movies'})._id
const gamesID = db.categories.findOne({name: 'Games'})._id

db.products.insertMany([
    {
        name: "Potop",
        description: "Klasyka polskiej literatury",
        price: 24,
        weight: 3,
        category: booksID
    },
    {
        name: "Tomb Raider",
        description: "Baba biega po dżungli",
        price: 60,
        weight: 1,
        category: gamesID
    },
    {
        name: "Rok 1984",
        description: "Dystopijna opowieść o urzędniku",
        price: 40,
        weight: 2,
        category: booksID
    },
    {
        name: "Matrix",
        description: "Neo robi fikołki w przód i w tył",
        price: 34,
        weight: .5,
        category: moviesID
    },
    {
        name: "Doom",
        description: "Strzelanie do diabłów nigdy się nie nudzi",
        price: 10,
        weight: .1,
        category: gamesID
    },
    {
        name: "Zemsta faraona",
        description: "Średnio śmieszne ale za to tanie",
        price: 3,
        weight: .4,
        category: moviesID
    }
])

db.users.insert({username: "Adam", email:"adam@sklep.org", phone: "+48 236 618 997"})


db.orders.insertMany([
    {
        products: [
            {
                product:     {
                    name: "Zemsta faraona",
                    description: "Średnio śmieszne ale za to tanie",
                    price: 3,
                    weight: .4,
                    category: moviesID
                },
                ammount: 10
            },
            {
                product:     {
                    name: "Doom",
                    description: "Strzelanie do diabłów nigdy się nie nudzi",
                    price: 10,
                    weight: .1,
                    category: gamesID
                },
                ammount: 3
            }
        ],
        status: "ZATWIERDZONE",
        user: db.users.findOne({username: "Adam"})?._id,
        date: "2022-11-25"
    },
    {
        products: [
            {
                product:     {
                    name: "Rok 1984",
                    description: "Dystopijna opowieść o urzędniku",
                    price: 40,
                    weight: 2,
                    category: booksID
                },
                ammount: 10
            },
            {
                product:     {
                    name: "Potop",
                    description: "Klasyka polskiej literatury",
                    price: 24,
                    weight: 3,
                    category: booksID
                },
                ammount: 3
            }
        ],
        status: "ZREALIZOWANE",
        user: db.users.findOne({username: "Adam"})?._id,
        date: "2021-03-01"
    }
])
