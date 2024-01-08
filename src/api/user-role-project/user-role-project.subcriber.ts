import { PermissionProject } from 'src/common/enum';
import { entity } from 'src/utils/helpers';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UserRoleProject } from './entities';

@EventSubscriber()
export class UserRoleProjectSubcriber
  implements EntitySubscriberInterface<UserRoleProject>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserRoleProject;
  }

  async beforeInsert(event: InsertEvent<UserRoleProject>) {
    let permission = event.entity.permission;

    if (permission) {
      const plainGender =
        permission ?? PermissionProject[PermissionProject.ADMINISTRATOR];
      if (
        entity.isValidFieldBeforeParse({
          data: PermissionProject,
          value: plainGender,
        })
      ) {
        event.entity.permission = Number(PermissionProject?.[plainGender]);
      }
    }
  }

  async beforeUpdate(event: UpdateEvent<UserRoleProject>) {
    let permission = event.entity.permission;

    if (permission) {
      const plainGender =
        permission ?? PermissionProject[PermissionProject.ADMINISTRATOR];
      if (
        entity.isValidFieldBeforeParse({
          data: PermissionProject,
          value: plainGender,
        })
      ) {
        event.entity.permission = Number(PermissionProject?.[plainGender]);
      }
    }
  }
}
