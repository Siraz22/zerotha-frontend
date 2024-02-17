import { InvestmentType } from '../enums/Investment-type';

export abstract class InvestmentDTO {
    id: number;
    quantity: number;
    averagePrice: number;
    investmentType: InvestmentType;
    //investmentHolder: userDTO
    associatedCountryId: number;
}
