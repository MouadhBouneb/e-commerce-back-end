/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';

  @Entity({ name: 'p_code' })
  export class Codes extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column({ length: 20, nullable: true,unique:true })
    cd_label: string;
  
    @Column({ nullable: true })
    cd_type: number;

    // ART | DV | FA | BC | BL
    @Column({ length: 150, nullable: true })
    cd_prefix: string;
  
    @Column({ length: 20, nullable: true,unique:true })
    cd_code: string;
  
    @Column({ default: true })
    pr_active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
  }
  