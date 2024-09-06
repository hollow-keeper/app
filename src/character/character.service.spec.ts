import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { CharacterController } from './character.controller';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));
describe('CharacterService', () => {
  let characterService: CharacterService;
  let characterRepository: MockType<Repository<Character>>;

  let characterToken = getRepositoryToken(Character);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: characterToken,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    characterService = module.get<CharacterService>(CharacterService);
    characterRepository =
      module.get<MockType<Repository<Character>>>(characterToken);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
  });

  // describe('getAvailableLevels', () => {
  //   it('should throw NotFoundException when character is not found', async () => {
  //     jest.spyOn(repository, 'findOne').mockResolvedValue(null);
  //     await expect(service.getAvailableLevels(1)).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });

  //   it('should throw NotFoundException when character has incomplete data', async () => {
  //     jest
  //       .spyOn(repository, 'findOne')
  //       .mockResolvedValue({ id: 1 } as Character);
  //     await expect(service.getAvailableLevels(1)).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });

  //   it('should return 0 levels when souls is 0', async () => {
  //     jest.spyOn(repository, 'findOne').mockResolvedValue({
  //       id: 1,
  //       equipment: { souls: 0 },
  //       characteristics: { level: 1 },
  //     } as Character);
  //     expect(await service.getAvailableLevels(1)).toBe(0);
  //   });

  //   it('should calculate levels correctly for low levels (1-11)', async () => {
  //     jest.spyOn(repository, 'findOne').mockResolvedValue({
  //       id: 1,
  //       equipment: { souls: 2000 },
  //       characteristics: { level: 1 },
  //     } as Character);
  //     expect(await service.getAvailableLevels(1)).toBe(3);
  //   });

  //   it('should calculate levels correctly for higher levels (12+)', async () => {
  //     jest.spyOn(repository, 'findOne').mockResolvedValue({
  //       id: 1,
  //       equipment: { souls: 20000 },
  //       characteristics: { level: 15 },
  //     } as Character);
  //     expect(await service.getAvailableLevels(1)).toBe(5);
  //   });

  //   it('should handle transition from low to high levels', async () => {
  //     jest.spyOn(repository, 'findOne').mockResolvedValue({
  //       id: 1,
  //       equipment: { souls: 10000 },
  //       characteristics: { level: 10 },
  //     } as Character);
  //     expect(await service.getAvailableLevels(1)).toBe(4);
  //   });
  // });
});
