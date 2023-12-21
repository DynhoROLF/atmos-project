import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import { Telemetry } from './entities/telemetry.entity'
import { TelemetryService } from './services/temeletry.service'
import { TelemetryController } from './controllers/telemetry.controller'
import { MqttService } from './services/mqtt.service'

@Module({
  imports: [
    // Configurações do ambiente
    TypeOrmModule.forFeature([Telemetry]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'atmos2023',
      database: 'nest-atmos',
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}'), Telemetry],
      synchronize: true,
    }),
  ],
  controllers: [TelemetryController], // Tudo que recebe requisição HTTP
  providers: [TelemetryService, MqttService], // Resto
})
export class AppModule {}
