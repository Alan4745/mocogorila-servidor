import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApodoService } from './apodo.service';
import { DTOUsuarios } from 'src/dto/usuarios.dto';
import { DtoBaseResponse } from 'src/dto/base.dto';
import { Usuarios } from 'src/schema/usuarios.schema';

@Controller('apodo')
export class ApodoController {

    constructor(private apodoServices: ApodoService){}

    @Post()
    registerUsers(@Body() usuarioApodo: DTOUsuarios): DtoBaseResponse {
        return this.apodoServices.registerApodos(usuarioApodo);
    }

    @Patch('/cambiar/:id')
    async updateApodo(@Param('id') id: string, @Body() newApodo: DTOUsuarios): Promise<Usuarios> {
        return await this.apodoServices.updateApodos(id, newApodo);
    }

    @Patch('/mocos/:id')
    async updateMocos(@Param('id') id: string): Promise<Usuarios> {
        return await this.apodoServices.updateProgress(id);
    }

    @Get()
    getUsuarios(){
        return this.apodoServices.getApodos();
    }
}
