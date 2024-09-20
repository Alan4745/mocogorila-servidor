import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DTOUsuarios } from 'src/dto/usuarios.dto';
import { Usuarios } from 'src/schema/usuarios.schema';

@Injectable()
export class ApodoService {

    constructor(@InjectModel(Usuarios.name) private usuarioModel: Model<Usuarios>) { }

    registerApodos(userRegister: DTOUsuarios): DtoBaseResponse {
        try {
            const createUser = {
                apodo: userRegister.apodo,
                mocos: [false, false, false, false, false],
                completed: 0
            }
            const newUser = new this.usuarioModel(createUser);
            newUser.save();
            baseResponse.message = 'Apodo registrado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.statusCode = 400;
            baseResponse.success = false;
            baseResponse.message = 'Ha ocurrido un error: ' + err.message;
            return baseResponse;
        }
    }

    async updateApodos(id: string, newApodo: DTOUsuarios): Promise<Usuarios> {
        try {
            const updatedUser = await this.usuarioModel.findByIdAndUpdate(
                id,
                { apodo: newApodo.apodo },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Usuario no encontrado');
            }

            return updatedUser;
        } catch (error) {
            throw new Error(`Error actualizando el apodo: ${error.message}`);
        }
    }

    async updateProgress(id: string): Promise<Usuarios> {
        try {
            const user = await this.usuarioModel.findById(id);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Lógica para actualizar el array de "mocos"
            const allTrue = user.mocos.every((item) => item === true);

            if (allTrue) {
                // Si todos son true, reinicia el array y aumenta "completed"
                user.mocos = [false, false, false, false, false];
                user.completed += 1;
            } else {
                // Si no todos son true, actualiza el siguiente "false" a "true"
                for (let i = 0; i < user.mocos.length; i++) {
                    if (user.mocos[i] === false) {
                        user.mocos[i] = true;
                        break;
                    }
                }
            }
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Error actualizando el usuario: ${error.message}`);
        }
    }

    getApodos() {
        try {
            return this.usuarioModel.find();
        } catch (err) {
            return err
        }
    }
}
