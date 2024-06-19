export interface UserAccountProps {
    name: string;
    lastName: string;
    email: string;
    cellphone: string;
    documentType: string;
    documentNumber: string;
    department: string;
    province: string;
    district: string;
    address: string;
    password: string;
}

export class UserAccountDto {
    name: string;
    lastName: string;
    email: string;
    cellphone: string;
    documentType: string;
    documentNumber: string;
    department: string;
    province: string;
    district: string;
    address: string;
    password: string;
    constructor(user: UserAccountProps){
        this.name = user.name
        this.lastName = user.lastName
        this.email = user.email
        this.cellphone = user.cellphone
        this.documentType = user.documentType
        this.documentNumber = user.documentNumber
        this.department = user.department
        this.province = user.province
        this.district = user.district
        this.address = user.address
        this.password = user.password
    }

}