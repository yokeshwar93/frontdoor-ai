import { Test } from '@nestjs/testing';

import { connect, Connection, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NotFoundException } from '../exceptions/notFound.exception';
import { SummaryController } from './summary.controller';
import { Summary, SummarySchema } from './schemas/summary.schema';
import { mockSummaries, mockSummary1 } from './__mock__/summary.mock';
import { SummaryService } from './summary.service';

describe('SummaryController', () => {
  let summaryController: SummaryController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let summaryModel: Model<Summary>;
  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    summaryModel = mongoConnection.model(Summary.name, SummarySchema);
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [SummaryController],
      providers: [
        SummaryService,
        {
          provide: getModelToken(Summary.name),
          useValue: summaryModel,
        },
      ],
    }).compile();

    summaryController = moduleRef.get<SummaryController>(SummaryController);
  }, 10000);

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  }, 10000);

  describe('get Summary from open api', () => {
    it('should return an summary', async () => {
      const result = await summaryController.getSummary({
        selectedText: mockSummary1.text,
      });
      expect(result.summary).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of summaries', async () => {
      await new summaryModel(mockSummary1).save();

      const summaries = await summaryController.findAll();
      expect(summaries.length).toBe(1);
    });
  });
  describe('find', () => {
    it('should return an summary if found', async () => {
      const result = mockSummary1;
      const createdSummary: any = await new summaryModel(mockSummary1).save();
      const summary = await summaryController.findSummary(createdSummary._id);
      expect(result.name).toBe(summary.name);
    });
    it('should throw exception if summary not found', async () => {
      let response;
      try {
        await summaryController.findSummary(mockSummaries[0].userId);
      } catch (e: any) {
        response = e;
      }
      expect(response).toStrictEqual(
        new NotFoundException('Summary not found'),
      );
    });
  });
  describe('find by user', () => {
    it('should return an summary if found', async () => {
      await new summaryModel(mockSummary1).save();
      await new summaryModel(mockSummary1).save();
      const summary = await summaryController.findSummaryForUser(
        mockSummary1.userId,
      );
      expect(summary.length).toBe(2);
    });
    it('should throw exception if summary not found', async () => {
      let response;
      try {
        await summaryController.findSummaryForUser(mockSummaries[0].userId);
      } catch (e: any) {
        response = e;
      }
      expect(response).toStrictEqual(
        new NotFoundException('Summary not found'),
      );
    });
  });
  describe('create', () => {
    it('should return created summary', async () => {
      const summary = await summaryController.saveSummary(mockSummary1);
      expect(summary.name).toBe(mockSummary1.name);
    });
  });
  describe('update', () => {
    it('should return updated summary', async () => {
      const createdSummary: any = await new summaryModel(mockSummary1).save();
      const summary = await summaryController.update(createdSummary._id, {
        name: 'Test',
      });
      expect(summary.name).toBe('Test');
    });
  });
  describe('delete', () => {
    it('should delete the user', async () => {
      const createdUser: any = await new summaryModel(mockSummary1).save();
      const response = await summaryController.deleteSummary(createdUser._id);
      expect(response).toBe('Summary deleted');
    });
    it('should throw exception if user not found', async () => {
      let response;
      try {
        await summaryController.deleteSummary(mockSummaries[0].userId);
      } catch (e: any) {
        response = e;
      }
      expect(response).toStrictEqual(
        new NotFoundException('Summary not found'),
      );
    });
  });
});
