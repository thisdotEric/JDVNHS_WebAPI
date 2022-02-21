export type UserType = 'student' | 'teacher';

export interface User {
  user_id: string;
  role: 'teacher' | 'student';
  first_name: string;
  middle_name: string;
  last_name: string;
}
