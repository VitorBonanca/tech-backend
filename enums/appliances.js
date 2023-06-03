const Enum = require('./enum')

const AppliancesEnum = Enum({
    Microsystem: {
        Name: 'Aparelho de Som',
        Image: '/images/aparelhoDeSom.png'
    },
    Heater: {
        Name: 'Aquecedor',
        Image: '/images/aquecedor.png'
    },
    AirConditioning: {
        Name: 'Ar Condicionado',
        Image: '/images/arCondicionado.png'
    },
    Computer: {
        Name: 'Computador',
        Image: '/images/computador.png'
    },
    Exhaustor: {
        Name: 'Exaustor',
        Image: '/images/exaustor.png'
    },
    GasCooker: {
        Name: 'Fogão a Gás',
        Image: '/images/fogaoGas.png'
    },
    ElectricCooker: {
        Name: 'Fogão Elétrico',
        Image: '/images/fogaoEletrico.png'
    },
    Freezer: {
        Name: 'Freezer',
        Image: '/images/freezer.png'
    },
    Fridge: {
        Name: 'Geladeira',
        Image: '/images/geladeira.png'
    },
    Laptop: {
        Name: 'Laptop',
        Image: '/images/laptop.png'
    },
    DishWasher: {
        Name: 'Lava Louças',
        Image: '/images/lavaLoucas.png'
    },
    WashingMachine: {
        Name: 'Máquina de Lavar',
        Image: '/images/lavaRoupas.png'
    },
    TumbleDryer: {
        Name: 'Secadora',
        Image: '/images/secadora.png'
    },
    CoffeeMachine: {
        Name: 'Máquina de Café',
        Image: '/images/cafeteira.png'
    },
    Microwave: {
        Name: 'Microondas',
        Image: '/images/microondas.png'
    },
    Television: {
        Name: 'Televisão',
        Image: '/images/televisao.png'
    },
    Toaster: {
        Name: 'Torradeira',
        Image: '/images/torradeira.png'
    },
    Shower: {
        Name: 'Chuveiro',
        Image: '/images/chuveiro.png'
    }
});

module.exports = AppliancesEnum;
