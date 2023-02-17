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
    latitude?: string

}

interface PaginatedPharmacy {
    content?: Pharmacy[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Service {
    idService?: string,
    username?: string,
    category?: string,
    owner?: string,
    description?: string,
    urlWeb?: string,
    phoneNumber?: string,
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
    phoneNumber?: string,
    imageUrl?: string
}

interface PaginatedSponsor {
    content?: Sponsor[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Necrologue {
    idNecro?: string,
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
    idNews?: string,
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
    description?: string
}

interface PaginatedIncident {
    content?: Incident[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Link{
    idLink?: string,
    username?: string,
    title?: string,
    url?: string
}
interface PaginatedLink{
    content?: Link[],
    totalPages?: number,
    totalElements?: number,
    pageNum?: number
}

interface Photos {
    idPhoto?: string,
    username?: string,
    title?: string,
    imageUrl?: string
}


interface EventList {
    list: Event[]
}

export type {
    EventList, Event, Ad as Advert, Tourism, Band,
    Pharmacy, Service, News, Incident, Photos, Link,
    Necrologue, Sponsor, PaginatedEvent, PaginatedAdvert,
    PaginatedNews, PaginatedTourism, PaginatedBand,
    PaginatedPharmacy, PaginatedService, PaginatedSponsor,
    PaginatedNecro, PaginatedIncident, PaginatedLink
}