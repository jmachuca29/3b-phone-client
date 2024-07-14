import { SaleState } from "src/constant/sales"

export type UserProps = {
    name: string
    lastName: string
    email: string
    phoneNumber: string
    department: string
    province: string
    district: string
    address: string
}

export type SaleCreateProps = {
    userId: string
    productId: string
    productName: string
    capacity: string
    originalBox: boolean
    serieNumber: string
    firstImei: string
    secondImei: string
    paymentType: string
    grade: string
    user: UserProps
    bankEntity: string
    numberAccount: string
    documentType: string
    documentNumber: string
}

export type SaleProps = {
    _id: string
    userId: string
    productId: string
    uuid: string
    productName: string
    capacity: string
    originalBox: boolean
    serieNumber: string
    firstImei: string
    secondImei: string
    paymentType: string
    grade: string
    user: UserProps
    price: number
    bankEntity: string
    numberAccount: string
    status: SaleState
    correlative: number
    createdAt: Date
    documentType: string
    documentNumber: string
}

export class SalesCreateDto {
    userId?: string
    productId: string
    productName: string
    capacity: string
    originalBox: boolean
    serieNumber: string
    firstImei: string
    secondImei: string
    paymentType: string
    grade: string
    user: UserProps
    bankEntity: string
    numberAccount: string
    documentType: string
    documentNumber: string
    constructor(sale: SaleCreateProps) {
        this. userId = sale?.userId
        this.productId = sale.productId
        this.productName = sale.productName || ''
        this.capacity = sale.capacity || ''
        this.originalBox = sale.originalBox || false
        this.serieNumber = sale.serieNumber || ''
        this.firstImei = sale.firstImei || ''
        this.secondImei = sale.secondImei || ''
        this.paymentType = sale.paymentType || ''
        this.grade = sale.grade || ''
        this.user = sale.user || null
        this.bankEntity = sale.bankEntity || ''
        this.numberAccount = sale.numberAccount || ''
        this.documentType = sale.documentType || ''
        this.documentNumber = sale.documentNumber || ''
    }
}

export class SalesDto extends SalesCreateDto {
    _id: string
    uuid: string
    price: number
    status: SaleState
    correlative: number
    createdAt: Date
    constructor(sale: SaleProps) {
        super(sale)
        this._id = sale._id
        this.uuid = sale.uuid || ''
        this.price = sale.price
        this.status = sale.status
        this.correlative = sale.correlative || 0
        this.createdAt = sale.createdAt
    }
}