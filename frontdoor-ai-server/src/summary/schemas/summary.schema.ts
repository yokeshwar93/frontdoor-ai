import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema({ timestamps: true })
export class Summary {
  @Prop({ required: false })
  name?: string;

  @Prop()
  text: string;

  @Prop()
  summary: string;

  @Prop([String])
  tags: string[];

  @Prop()
  userId: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
