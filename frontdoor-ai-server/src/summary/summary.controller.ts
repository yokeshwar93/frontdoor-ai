import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SaveSummaryDto } from './dto/saveSummary.dto';
import { Summary } from './schemas/summary.schema';

@ApiTags('summary')
@Controller('summary')
export class SummaryController {
  constructor(private summaryService: SummaryService) {}

  @Get('/getAllSummaries')
  async findAll(): Promise<Summary[]> {
    return await this.summaryService.findAll();
  }

  @Post('/getSummary')
  async getSummary(@Body() text: { selectedText: string }): Promise<{
    summary: string;
  }> {
    return await this.summaryService.getSummary(text);
  }

  @Post('/saveSummary')
  @UsePipes(new ValidationPipe())
  async saveSummary(@Body() saveSummaryDTO: SaveSummaryDto): Promise<Summary> {
    return await this.summaryService.saveSummary(saveSummaryDTO);
  }

  @Get('/getSummaryById/:id')
  async findSummary(
    @Param('id', new ValidationPipe()) id: string,
  ): Promise<Summary> {
    return await this.summaryService.findOne(id);
  }
  @Get('/getSummaryForUser/:userId')
  async findSummaryForUser(
    @Param('userId', new ValidationPipe()) userId: string,
  ): Promise<Summary[]> {
    return await this.summaryService.findSummariesForUser(userId);
  }

  @Delete('/deleteSummary/:id')
  async deleteSummary(
    @Param('id', new ValidationPipe()) id: string,
  ): Promise<string> {
    return await this.summaryService.deleteSummary(id);
  }
  @Put('/update/:id')
  async update(
    @Param('id', new ValidationPipe()) id: string,
    @Body() updateSummaryDTO: Partial<Summary>,
  ): Promise<Summary> {
    return await this.summaryService.updateSummary(id, updateSummaryDTO);
  }
}
