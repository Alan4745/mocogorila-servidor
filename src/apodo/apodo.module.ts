import { Module } from '@nestjs/common';
import { ApodoController } from './apodo.controller';
import { ApodoService } from './apodo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuariosSchema } from 'src/schema/usuarios.schema';

@Module({
  imports:[ MongooseModule.forFeature([{
    name: Usuarios.name,
    schema: UsuariosSchema
  }])],
  controllers: [ApodoController],
  providers: [ApodoService]
})
export class ApodoModule {}
