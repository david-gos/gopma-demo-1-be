import { User } from 'src/api/user/entities';
import { Base as BaseEntity } from 'src/common/dto';
import { PermissionProject } from 'src/common/enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Project } from '../../project/entities/project.entities';

@Entity({ name: 'user_role_project' })
export class UserRoleProject extends BaseEntity {
  @Column({ type: 'enum', enum: PermissionProject, nullable: true })
  permission: PermissionProject;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @ManyToOne(() => Project, (project) => project.roles)
  project: Project;
}
