import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { baseResponse, DtoBaseResponse } from 'src/dto/base.dto';
import { DTOUsuarios } from 'src/dto/usuarios.dto';
import { Usuarios } from 'src/schema/usuarios.schema';

@Injectable()
export class ApodoService {

    constructor(@InjectModel(Usuarios.name) private usuarioModel: Model<Usuarios>) { }

    async registerApodos(userRegister: DTOUsuarios): Promise<DtoBaseResponse> {
        try {
            // Crear el usuario con los datos necesarios
            const createUser = {
                apodo: userRegister.apodo,
                mocos: [false, false, false, false, false],
                completed: 0
            };
    
            // Crear la instancia del nuevo usuario
            const newUser = new this.usuarioModel(createUser);
    
            // Guardar el usuario en la base de datos y esperar a que se complete
            const savedUser = await newUser.save();
    
            // Construir la respuesta con el _id del usuario registrado
            baseResponse.message = 'Apodo registrado exitosamente';
            baseResponse.success = true;  // Asumimos que 'success' indica un estado exitoso
    
            // Incluir el _id del usuario en la respuesta para que se pueda utilizar en el frontend
            baseResponse.data = { id: savedUser._id };
    
            return baseResponse;
        } catch (err) {
            // Manejo de errores
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

    async updateProgress(id: string, registro: number): Promise<Usuarios> {
        try {
            const user = await this.usuarioModel.findById(id);
    
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
    
            // Validar que el número de registro esté entre 1 y 5
            if (registro < 1 || registro > 5) {
                throw new Error('El número de registro debe estar entre 1 y 5');
            }
    
            // Convertir el número de registro en un índice del array (0-based index)
            const index = registro - 1;
    
            // Actualizar el valor del array "mocos" en la posición especificada
            user.mocos[index] = true;
    
            // Verificar si todos los valores en "mocos" son `true`
            const allTrue = user.mocos.every((moco) => moco === true);
    
            if (allTrue) {
                // Si todos los valores son true, reiniciar el array y aumentar "completed"
                user.mocos = [false, false, false, false, false];
                user.completed += 1;
            }
    
            // Guardar los cambios en la base de datos
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
