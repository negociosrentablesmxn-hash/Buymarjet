import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { Investment } from './Investment'

@Entity('user_investments')
export class UserInvestment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @ManyToOne(() => Investment)
  @JoinColumn({ name: 'investmentId' })
  investment: Investment

  @Column()
  investmentId: string

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number

  @Column('decimal', { precision: 15, scale: 2 })
  currentValue: number

  @Column({ default: 'active' })
  status: 'active' | 'withdrawn' | 'pending'

  @CreateDateColumn()
  investedAt: Date
}