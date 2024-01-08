import { Exclude } from 'class-transformer';
import { omit } from 'ramda';
import { Column, Entity, OneToMany } from 'typeorm';

import { UserRoleProject } from 'src/api/user-role-project/entities';
import { Base as BaseEntity } from 'src/common/dto';
import { Gender, UserRole } from 'src/common/enum';

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
  dob: Date;

  @Column({ name: 'phone_number', unique: true })
  phone: string;

  @OneToMany(() => UserRoleProject, (userRoleProject) => userRoleProject.user)
  roles: UserRoleProject[];

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public toResponse(): Omit<this, 'password'> & {
    role: string;
    gender: string;
  } {
    return {
      ...omit(['password'], this),
      role: UserRole[UserRole.USER],
      gender: Gender[this.gender] || null,
    };
  }
}
