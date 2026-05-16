import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @Column()
  type: 'investment' | 'withdrawal' | 'dividend'

  @Column({ nullable: true })
  investmentName?: string

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number

  @Column()
  status: 'pending' | 'completed' | 'failed'

  @Column({ nullable: true })
  paymentMethod?: string

  @Column({ nullable: true })
  transactionId?: string

  @CreateDateColumn()
  createdAt: Date
}