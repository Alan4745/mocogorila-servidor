export class DtoBaseResponse {
    success: boolean = true;
    message: string;
    statusCode: number = 200;
    data?: any; // Agregamos la propiedad 'data' opcional
}

export const baseResponse: DtoBaseResponse = {
    message: '',
    statusCode: 200,
    success: true
};
