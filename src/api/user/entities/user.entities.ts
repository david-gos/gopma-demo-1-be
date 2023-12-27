import { omit } from 'ramda';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Base as BaseEntity } from 'src/common/dto';
import { Gender, UserRole } from 'src/common/enum';
import { entity, hash } from 'src/utils/helpers';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  bod: Date;

  @Column({ name: 'phone_number', unique: true })
  phone: string;

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // @BeforeInsert()
  // private async setInsertingData(): Promise<void> {
  //   const saltRounds = 10;

  //   this.password = await hash.generateWithBcrypt({
  //     source: this.password,
  //     salt: saltRounds,
  //   });

  //   this.parseGenderBeforeAction();
  // }

  // @BeforeUpdate()
  // private async setUpdatingData(): Promise<void> {
  //   this.parseGenderBeforeAction();
  // }

  public async hashPassword(): Promise<void> {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }
  public parseGenderBeforeAction(): void {
    if (this.gender) {
      const plainGender = this.gender ?? Gender[Gender.MALE];

      if (
        entity.isValidFieldBeforeParse({ data: Gender, value: plainGender })
      ) {
        this.gender = Number(Gender?.[plainGender]);
      }
    }
  }

  public toResponse(): Omit<
    this,
    'password' | 'setInsertingData' | 'setUpdatingData'
  > & {
    role: string;
    gender: string;
  } {
    return {
      ...omit(['password', 'setInsertingData', 'setUpdatingData'], this),
      role: UserRole[UserRole.USER],
      gender: Gender[this.gender] || null,
    };
  }
}
