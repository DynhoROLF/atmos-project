import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { TelemetryService } from '../services/temeletry.service'
import { Telemetry } from 'src/entities/telemetry.entity'

@Controller('/telemetry')
export class TelemetryController {
  constructor(private telemetryService: TelemetryService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Telemetry[]> {
    return this.telemetryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Telemetry> {
    return this.telemetryService.findOne(id)
  }

  @Get(':mac/average-temperature')
  findAverageTemperature(
    @Param('mac') mac: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<number> {
    return this.telemetryService.findAverageTemperature(
      mac,
      new Date(start),
      new Date(end),
    )
  }

  @Post()
  @HttpCode(201)
  async createTelemetry(@Body() telemetry: Telemetry) {
    return this.telemetryService.create(telemetry)
  }
}
