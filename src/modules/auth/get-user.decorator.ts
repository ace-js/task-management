import { createParamDecorator } from '@nestjs/common';

import { User } from './user.entity';

// custom decorator to inject user into a request handler
export const GetUser = createParamDecorator((data, req): User => {
  return req.args[0]?.user
})