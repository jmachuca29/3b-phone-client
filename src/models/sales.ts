export type UserProps = {
    name: string
    lastName: string
    email: string
    phoneNumber: string
    ubigeo: string
    address: string
}

export type SaleCreateProps = {
    productId: string
    productName: string
    capacity: string
    accesories: string[]
    serieNumber: string
    firstImei: string
    secondImei: string
    paymentType: string
    grade: string
    user: UserProps
    bankEntity: string
    numberAccount: string
}

export class SalesCreateDto {
    productId: string
    productName: string
    capacity: string
    accesories: string[]
    serieNumber: string
    firstImei: string
    secondImei: string
    paymentType: string
    grade: string
    user: UserProps
    bankEntity: string
    numberAccount: string
    constructor(sale: SaleCreateProps) {
        this.productId = sale.productId
        this.productName = sale.productName || ''
        this.capacity = sale.capacity || ''
        this.accesories = sale.accesories || []
        this.serieNumber = sale.serieNumber || ''
        this.firstImei = sale.firstImei || ''
        this.secondImei = sale.secondImei || ''
        this.paymentType = sale.paymentType || ''
        this.grade = sale.grade || ''
        this.user = sale.user || null
        this.bankEntity = sale.bankEntity || ''
        this.numberAccount = sale.numberAccount || ''
    }
}