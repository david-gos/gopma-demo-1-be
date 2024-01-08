import { Base as BaseEntity } from 'src/common/dto';
import { StatusProject } from 'src/common/enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoleProject } from '../../user-role-project/entities/user-role-project.entities';

@Entity({ name: 'project' })
export class Project extends BaseEntity {
  @Column({})
  name: string;

  @Column({ type: 'enum', enum: StatusProject, nullable: true })
  status: StatusProject;

  @Column({ type: 'date', nullable: true })
  timeStart: Date;

  @Column({ type: 'date', nullable: true })
  timeEnd: Date;

  @OneToMany(
    () => UserRoleProject,
    (userRoleProject) => userRoleProject.project,
  )
  roles: UserRoleProject[];
}
