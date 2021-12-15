import { StudentConstants } from '../../constant/constants';

type UserType = 'teacher' | 'student' | 'invalid';

export default function checkUserType(id: string): UserType {
  if (id.length == StudentConstants.LRN_LENGTH && /^\d+$/.test(id))
    return 'student';
  else if (id.length == 7 && /^\d+$/.test(id)) return 'teacher';
  else return 'invalid';
}
