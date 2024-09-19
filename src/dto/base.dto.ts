export class DtoBaseResponse {
    success: boolean = true;
    message: string;
    statusCode: number = 200;
}

export const baseResponse: DtoBaseResponse = {
    message: '',
    statusCode: 200,
    success: true
}