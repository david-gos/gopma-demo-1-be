import { StatusProject } from 'src/common/enum';
import { entity } from 'src/utils/helpers';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Project } from './entities';

@EventSubscriber()
export class ProjectSubcriber implements EntitySubscriberInterface<Project> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Project;
  }

  async beforeUpdate(event: UpdateEvent<Project>) {
    let status = event.entity.status;

    if (status) {
      const plainStatus = status ?? StatusProject[StatusProject.ON_TIME];

      if (
        entity.isValidFieldBeforeParse({
          data: StatusProject,
          value: plainStatus,
        })
      ) {
        status = Number(StatusProject?.[plainStatus]);
      }
    }
  }
}
