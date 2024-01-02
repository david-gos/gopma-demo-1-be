import * as bcrypt from 'bcryptjs';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { Gender } from 'src/common/enum';
import { entity } from 'src/utils/helpers';
import { User } from './entities';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const hashedPassword = await bcrypt.hash(event.entity.password, 10);

    event.entity.password = hashedPassword;

    let gender = event.entity.gender;

    if (gender) {
      const plainGender = gender ?? Gender[Gender.MALE];
      if (
        entity.isValidFieldBeforeParse({ data: Gender, value: plainGender })
      ) {
        event.entity.gender = Number(Gender?.[plainGender]);
      }
    }
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    let gender = event.entity.gender;

    if (gender) {
      const plainGender = gender ?? Gender[Gender.MALE];
      if (
        entity.isValidFieldBeforeParse({ data: Gender, value: plainGender })
      ) {
        event.entity.gender = Number(Gender?.[plainGender]);
      }
    }
  }
}
