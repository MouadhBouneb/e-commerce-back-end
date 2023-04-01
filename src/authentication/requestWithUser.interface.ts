/* eslint-disable prettier/prettier */

import { Request } from 'express';
import { User } from 'src/models/user';
 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;