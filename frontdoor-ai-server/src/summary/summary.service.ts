import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { SaveSummaryDto } from './dto/saveSummary.dto';
import { Summary } from './schemas/summary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { NotFoundException } from '../exceptions/notFound.exception';
@Injectable()
export class SummaryService {
  private readonly configuration: Configuration;
  private openai: OpenAIApi;
  constructor(@InjectModel(Summary.name) private summaryModel: Model<Summary>) {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }
  async getSummary(request: { selectedText: string }): Promise<any> {
    const { data } = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize the following text. ${request.selectedText}`,
      temperature: 0,
      max_tokens: 500,
    });
    const { choices } = data;
    return { summary: choices[0].text };
  }

  async saveSummary(summaryDTO: SaveSummaryDto): Promise<Summary> {
    const summaryObject = new this.summaryModel(summaryDTO);
    return summaryObject.save();
  }
  findAll(): Promise<Summary[]> {
    return this.summaryModel.find().exec();
  }
  async findOne(id: string): Promise<Summary> {
    const summary: Summary = await this.summaryModel.findById(id);

    if (summary) {
      return summary;
    } else {
      throw new NotFoundException('Summary not found');
    }
  }
  async findSummariesForUser(userId: string): Promise<Summary[]> {
    const summary: Summary[] = await this.summaryModel
      .find({
        userId,
      })
      .sort({ createdAt: -1 });

    if (summary.length > 0) {
      return summary;
    } else {
      throw new NotFoundException('Summary not found');
    }
  }
  async deleteSummary(id: string): Promise<string> {
    const { deletedCount } = await this.summaryModel.deleteOne({ _id: id });
    if (deletedCount != 0) {
      return 'Summary deleted';
    }
    throw new NotFoundException('Summary not found');
  }
  async updateSummary(id: string, summary: Partial<Summary>): Promise<Summary> {
    await this.summaryModel.findByIdAndUpdate(id, summary);
    return this.summaryModel.findById(id);
  }
}
