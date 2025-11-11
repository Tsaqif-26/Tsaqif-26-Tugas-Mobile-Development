
export type Product = {
    id:string
    name: string
    price: number
    imageUrl: string
    description?: string
    category: string[]
}

export const initialProducts: Product[] = [
    {
        id:'1',
        name: 'Ayam geprek',
        price: 15000,
        imageUrl: 'https://media.istockphoto.com/id/1310768631/id/foto/ayam-geprek-indonesian-food-ayam-goreng-renyah-dengan-sambal-sambal-sambal-pedas-dan-panas.webp?a=1&b=1&s=612x612&w=0&k=20&c=js_HEKHg6cwb9fNyH6aXgxQ6RWMUaFI001H0kXcWP9w=',
        description:'Ayam geprek Ter-pedas',
        category: ['Populer','Makanan']
    },
    {
        id:'2',
        name: 'Ayam bakar',
        price: 18000,
        imageUrl: 'https://images.unsplash.com/photo-1597652096872-658bf24731ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF5YW0lMjBiYWthcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
        description:'Ayam bakar lembut',
        category: ['Makanan']
    },{
        id:'3',
        name: 'Ikan crispy',
        price: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1565733618599-cb82f14f34ac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aWthbiUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
        description:'Kriuk-nya sedap',
        category: ['Makanan']

    },{
        id:'4',
        name: 'Udang goreng',
        price: 10000,
        imageUrl: 'https://images.unsplash.com/photo-1579670039509-e21e75007e4c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dWRhbmclMjBnb3Jlbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
        description:'Udang goreng enak',
        category: ['Makanan']
    },{
        id:'5',
        name: 'Cumi-cumi bumbu hitam',
        price: 12000,
        imageUrl:'https://images.unsplash.com/photo-1644883426004-917cfd0d8105?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3VtaSUyMGN1bWklMjBidW1idSUyMGhpdGFtfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
        description:'Bumbunya meresap sampai kedalam',
        category: ['Makanan']

    },{
        id:'6',
        name: 'Nasi goreng',
        price: 10000,
        imageUrl:'https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmFzaSUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
        description:'Nasi goreng rumahan',
        category: ['Makanan']

    },{
        id:'7',
        name: 'Es susu',
        price:5000 ,
        imageUrl:'https://plus.unsplash.com/premium_photo-1731675875900-7942634a0332?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXMlMjBzdXN1fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
        description:'Es susu dengan susu murni',
        category: ['Populer', 'Minuman']

    },{
        id:'8',
        name: 'Es degan',
        price: 8000,
        imageUrl:'https://media.istockphoto.com/id/1315956317/id/foto/es-kelapa-muda-gula-jawa-atau-es-degan-atau-kelapa-muda-dengan-es-gula-aren-adalah-minuman.webp?a=1&b=1&s=612x612&w=0&k=20&c=TXWPMJkRwn-sr5yfcqmv_jBCz31yfeXl4MJ6Ep1Sfw8=',
        description:'Es degan segar',
        category: ['Minuman']

    },{
        id:'9',
        name: 'Es teh',
        price: 3000,
        imageUrl:'https://media.istockphoto.com/id/1204404992/id/foto/teh-es-lemon.webp?a=1&b=1&s=612x612&w=0&k=20&c=QJoIMFPmBXVf0-3O67Is0Nl7w-Tpa7RmA-ApBoPdeOE=',
        description:'Es teh original',
        category: ['Minuman']

    },{
        id:'10',
        name: 'Special Menu',
        price: 50000,
        imageUrl:'https://images.unsplash.com/photo-1630173314503-544080d4dee7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmF0YXRvdWlsbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
        description:'Secret Menu',
        category: ['Populer', 'Makanan']

    },
    
]

