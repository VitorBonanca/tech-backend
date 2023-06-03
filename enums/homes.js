import { Enum } from './enum'

const Homes = Enum({
    House: {
        Name: 'Casa',
        Image: '/images/casa.png'
    },
    Apartment: {
        Name: 'Apartamento',
        Image: '/images/apartamento.png'
    },
    Land: {
        Name: 'Chácara',
        Image: '/images/chacara.png'
    },
    Terrace: {
        Name: 'Terraço',
        Image: '/images/terraco.png'
    },
    TwoStory: {
        Name: 'Sobrado',
        Image: '/images/sobrado.png'
    },
    Office: {
        Name: 'Escritório',
        Image: '/images/escritorio.png'
    }
})
