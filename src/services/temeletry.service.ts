import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Telemetry } from '../entities/telemetry.entity'
import { FindOneOptions, Repository } from 'typeorm'

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(Telemetry)
    private telemetryRepository: Repository<Telemetry>,
  ) {}

  findAll(): Promise<Telemetry[]> {
    return this.telemetryRepository.find()
  }

  findOne(id: number): Promise<Telemetry> {
    if (typeof id !== 'number') {
      throw new Error('id must be a number')
    }
    console.log(`Finding telemetry with id ${id}`)

    const options: FindOneOptions<Telemetry> = {
      where: {
        id,
      },
    }
    return this.telemetryRepository.findOne(options)
  }

  async findAverageTemperature(
    mac: string,
    start: Date,
    end: Date,
  ): Promise<number> {
    const qb = this.telemetryRepository.createQueryBuilder('telemetry')

    const result = await qb
      .select('AVG(telemetry.temp_1)', 'avgTemperature')
      .where('telemetry.mac = :mac', { mac })
      .andWhere('telemetry.date BETWEEN :start AND :end', { start, end })
      .getRawOne()

    return result.avgTemperature
  }

  async create(telemetry: Telemetry): Promise<Telemetry> {
    return this.telemetryRepository.save(telemetry)
  }
}
