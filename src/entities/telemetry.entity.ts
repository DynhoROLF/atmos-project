import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Telemetry {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  mac: string

  @Column('double precision')
  temp_1: number

  @Column('double precision')
  temp_2: number

  @Column('double precision')
  rssi: number

  @Column('double precision')
  date: number

  @Column('text')
  compressor_buffer: string

  @Column('text')
  evap_fan_buffer: string

  @Column('text')
  defrost_buffer: string

  @Column('text')
  open_door_buffer: string
}
