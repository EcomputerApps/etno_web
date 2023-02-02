type Image = {
    idImage?: string,
    locality?: string,
    section?: string,
    name?: string,
    category?: string,
    link?: string
}

type Video = {
    idVideo?: string,
    link?: string
}

type UserSubscription = {
    idSubscriptionUser?: string,
    fcmToken?: string,
    title?: string,
    seats?: number,
    name?: string,
    mail?: string,
    phone?: string,
    wallet?: number,
    isSubscribe?: boolean
}

interface Event{
    idEvent?: string,
    username?: string,
    title?: string,
    address?: string,
    description?: string,
    organization?: string,
    reservePrice?: number,
    seats?: number,
    capacity?: number,
    link?: string,
    imageUrl?: string,
    startDate?: string,
    endDate?: string,
    publicationDate?: string,
    time?: string,
    lat?: string,
    long?: string
}

interface Tourism{
    idTourism?: string,
    type?: string,
    username?: string,
    title?: string,
    description?: string,
    imageUrl?: string,
    longitude?: string,
    latitude?: string
}

interface Band{
    idBand?: string,
    username?: string,
    title?: string,
    description?: string,
    issuedDate?:string,
    imageUrl?: string,
}

interface Pharmacy{
    idPharmacy?: string,
    username?: string,
    type?: string,
    name?: string,
    link?: string,
    imageUrl?: string,
    phone?: string,
    schedule?:string,
    description?: string,
    lat?: string,
    long?: string
   
}

interface Service{
    idService?: string,
    username?: string,
    category?: string,
    owner?: string,
    phoneNumber?:string,
    schedule?:string,
    imageUrl?: string,
}
interface Sponsor{
    idSponsor?: string,
    username?: string,
    title?: string,
    description?: string,
    phoneNumber?:string,
    imageUrl?: string,
}

interface Necrologue{
    idNecro?: string,
    username?: string,
    name?: string,
    deathDate?: string,
    description?:string,
    imageUrl?: string,
}

interface News{
    idNews?: string,
    username?: string,
    name?: string,
    description?:string,
    link?: string,
    imageUrl?: string,
}


interface EventList{
    list: Event[]
}

export type {EventList, Event, Tourism, Band, Pharmacy, Service, News,  Necrologue, Sponsor}