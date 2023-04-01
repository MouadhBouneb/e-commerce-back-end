/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';

  @Entity({ name: 'p_parametre' })
  export class Parametre extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column({ length: 20, nullable: true,unique:true })
    pr_label: string;
  
    @Column({ length: 20, nullable: true,unique:true })
    pr_code: string;
  
    @Column({ length: 150, nullable: true })
    pr_desciption: string;
  
  
    @Column({ length: 150, nullable: true })
    pr_categorie: string;
  
    @Column({ length: 150, nullable: true })
    pr_codeCategorie: string;
  
    @Column({ default: true })
    pr_active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
  }
  