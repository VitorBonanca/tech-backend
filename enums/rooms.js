import { Enum } from './enum'

const Rooms = Enum({
    Bedroom: {
        Name: 'Quarto',
        Image: '/images/quarto.png'
    },
    LivingRoom: {
        Name: 'Sala de Estar',
        Image: '/images/salaEstar.png'
    },
    DinningRoom: {
        Name: 'Sala de Jantar',
        Image: '/images/salaJantar.png'
    },
    Kitchen: {
        Name: 'Cozinha',
        Image: '/images/cozinha.png'
    },
    Office: {
        Name: 'Escritório',
        Image: '/images/comodoEscritorio.png'
    },
    Bathroom: {
        Name: 'Banheiro',
        Image: '/images/banheiro.png'
    },
    Laundry: {
        Name: 'Lavanderia',
        Image: '/images/lavanderia.png'
    },
    Yard: {
        Name: 'Quintal',
        Image: '/images/quintal.png'
    }
})
