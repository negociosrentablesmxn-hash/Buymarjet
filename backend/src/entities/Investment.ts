import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({ nullable: true })
  longDescription?: string

  @Column('decimal', { precision: 15, scale: 2 })
  minimumInvestment: number

  @Column()
  expectedReturn: string

  @Column()
  risk: 'Bajo' | 'Medio' | 'Alto'

  @Column()
  category: string

  @Column('decimal', { precision: 15, scale: 2 })
  currentValue: number

  @Column({ default: 0 })
  investorCount: number

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdAt: Date
}