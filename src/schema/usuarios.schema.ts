import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Usuarios {
    @Prop()
    apodo: string;
    @Prop()
    mocos: string[];
    @Prop()
    completed: number;
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios);
