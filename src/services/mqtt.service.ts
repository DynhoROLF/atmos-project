import { Injectable, OnModuleInit } from '@nestjs/common'
import { TelemetryService } from './temeletry.service'
import { Telemetry } from '../entities/telemetry.entity'
import mqtt from 'mqtt'

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(private telemetryService: TelemetryService) {}

  onModuleInit() {
    const client = mqtt.connect(
      'b1c839884c1a44be82dc71cbfdf5b3cc.s1.eu.hivemq.cloud',
      {
        port: 8883,
        protocol: 'mqtt',
      },
    )

    client.on('connect', () => {
      console.log('connected to MQTT broker')
      client.subscribe('/rcd-cr-atmos/192.168.200.249')
    })

    client.on('message', async (topic, message) => {
      const telemetryData = JSON.parse(message.toString())

      const telemetry = new Telemetry()
      telemetry.mac = telemetryData.mac
      telemetry.temp_1 = telemetryData.temp_1
      telemetry.temp_2 = telemetryData.temp_2
      telemetry.rssi = telemetryData.rssi
      telemetry.date = telemetryData.date
      telemetry.compressor_buffer = telemetryData.compressor_buffer
      telemetry.evap_fan_buffer = telemetryData.evap_fan_buffer
      telemetry.defrost_buffer = telemetryData.defrost_buffer
      telemetry.open_door_buffer = telemetryData.open_door_buffer

      await this.telemetryService
        .create(telemetry)
        .then(() => {
          console.log('Telemetry saved to database')
        })
        .catch((error) => {
          console.error('Error saving telemetry to database', error)
        })
    })
  }
}
