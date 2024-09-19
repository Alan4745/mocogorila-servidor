import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DTOUsuarios } from 'src/dto/usuarios.dto';
import { Usuarios } from 'src/schema/usuarios.schema';

@Injectable()
export class ApodoService {

    constructor(@InjectModel(Usuarios.name) private usuarioModel: Model<Usuarios>){}

    registerApodos(userRegister: DTOUsuarios): DtoBaseResponse {
        try {
            const newUser =  new this.usuarioModel(userRegister); 
            newUser.save();
            baseResponse.message = 'Apodo registrado exitosamente';
            return baseResponse;
        } catch (err){
            baseResponse.statusCode = 400;
            baseResponse.success = false;
            baseResponse.message = 'Ha ocurrido un error: ' + err.message;
            return baseResponse;
        }
    }

    getApodos() {
        try{
            return this.usuarioModel.find();
        } catch(err){
            return err
        }
    }
}
