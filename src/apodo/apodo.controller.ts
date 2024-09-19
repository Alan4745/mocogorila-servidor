import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApodoService } from './apodo.service';
import { DTOUsuarios } from 'src/dto/usuarios.dto';
import { DtoBaseResponse } from 'src/dto/base.dto';

@Controller('apodo')
export class ApodoController {

    constructor(private apodoServices: ApodoService){}

    @Post()
    registerUsers(@Body() usuarioApodo: DTOUsuarios): DtoBaseResponse {
        return this.apodoServices.registerApodos(usuarioApodo);
    }

    @Get()
    getUsuarios(){
        return this.apodoServices.getApodos();
    }
}
