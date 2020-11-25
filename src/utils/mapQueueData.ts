import { mapQueueDataInterface } from '../../types/interfaces';

export default ({ members, _id, name }: mapQueueDataInterface) => ({
  name,
  id: _id,
  length: members.length
});