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

interface Event {
    idEvent?: string,
    username?: string,
    title?: string,
    address?: string,
    description?: string,
    organization?: string,
    hasSubscription? : boolean,
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


interface PaginatedEvent {
    content?: Event[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Reserv{
    idReserv?: string,
    username?: string,
    name?: string,
    email?: string,
    phone?: string,
    isPrivate?: boolean,
    place?: string,
    hall?: string,
    date?: string[],
    time?: string[]
}
interface ReservList{
    reservs? : Reserv[]
}
interface PaginatedReserv {
    content?: Reserv[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}
interface Hall{
    idHall?: string,
    username?: string,
    hallName?: string,
    timeStripe?: number,
    price?: number,
    workDays?: string,
    morningTime?: string,
    eveningTime?:string,
    isActive?: boolean
}

interface Place{
    idPlace?: string,
    username?: string,
    placeName?: string,
    lat?: string,
    long?: string,
    hall?: Hall[],
  
}

interface PaginatedPlace{
    content?: Place[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Ad {
    idAd?: string,
    username?: string,
    title?: string,
    description?: string,
    imageUrl?: string,
    webUrl?: string
}

interface PaginatedAdvert {
    content?: Ad[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Tourism {
    idTourism?: string,
    type?: string,
    username?: string,
    title?: string,
    description?: string,
    imageUrl?: string,
    longitude?: string,
    latitude?: string
}

interface PaginatedTourism {
    content?: Tourism[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Band {
    idBando?: string,
    username?: string,
    title?: string,
    description?: string,
    issuedDate?: string,
    imageUrl?: string
}

interface PaginatedBand {
    content?: Band[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface BandList{
    bandos?: Band[]
}

interface Pharmacy {
    idPharmacy?: string,
    username?: string,
    type?: string,
    name?: string,
    link?: string,
    imageUrl?: string,
    phone?: string,
    schedule?: string,
    description?: string,
    longitude?: string,
    latitude?: string,
    startDate?: Date,
    durationDays?: number,
    frequencyInDays?: number,
    dates?: PharmacyDutyDate[]

}

interface PaginatedPharmacy {
    content?: Pharmacy[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface PharmacyOnDuty {
    content?: Pharmacy[]
}
interface PharmacyDutyDate{
    idPharmacyDate?: string,
    username?: string,
    namePharmacy?: string,
    date?: Date
}



interface Service {
    idService?: string,
    username?: string,
    category?: string,
    owner?: string,
    description?: string,
    urlWeb?: string,
    number?: string,
    schedule?: string,
    imageUrl?: string
}

interface PaginatedService {
    content?: Service[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Sponsor {
    idSponsor?: string,
    username?: string,
    title?: string,
    description?: string,
    phone?: string,
    urlImage?: string
}

interface PaginatedSponsor {
    content?: Sponsor[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Necrologue {
    idDeath?: string,
    username?: string,
    name?: string,
    deathDate?: string,
    description?: string,
    imageUrl?: string
}

interface PaginatedNecro {
    content?: Necrologue[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface News {
    idNew?: string,
    username?: string,
    category?: string,
    title?: string,
    publicationDate?: string,
    description?: string,
    imageUrl?: string
}
interface PaginatedNews {
    content?: News[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Incident {
    idIncident?: string,
    username?: string,
    fcmToken?: string,
    title?: string,
    description?: string,
    issuedDate?: string,
    resolution?: boolean

}

interface PaginatedIncident {
    content?: Incident[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Link {
    idLink?: string,
    username?: string,
    title?: string,
    url?: string
}
interface PaginatedLink {
    content?: Link[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}



interface PaginatedImages {
    content?: Image[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}



interface EventList {
    list: Event[]
}

export type {
    EventList, Event, Ad , Tourism, Band,BandList,
    Pharmacy, Service, News, Incident,  Link,
    Necrologue, Sponsor, PaginatedEvent, PaginatedAdvert,
    PaginatedNews, PaginatedTourism, PaginatedBand,
    PaginatedPharmacy, PaginatedService, PaginatedSponsor,
    PaginatedNecro, PaginatedIncident, PaginatedLink,
    Image, PharmacyOnDuty, PaginatedImages, PharmacyDutyDate, Reserv, 
    ReservList, PaginatedReserv, Place, Hall,PaginatedPlace
}