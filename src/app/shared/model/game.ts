



export class GameDto {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  status?: string | undefined;  
  lastContactDate?: Date | undefined;    
}


export class WrapperOfIEnumerableOfGameDto {
  statusCode?: number | undefined;
  errorMessage?: string | undefined;
  infoMessage?: string | undefined;
  links?: Link[] | undefined;
  data?: GameDto[] | undefined;
  executionDate?: Date | undefined;
}


export class Link  {
  rel?: string | undefined;
  href?: string | undefined;
}


export class AccessResultDto {
  success?: boolean | undefined;
  gameId?: string | undefined;
  token?: string | undefined;
}

export class WrapperOfAccessResultDto {
  statusCode?: number | undefined;
  errorMessage?: string | undefined;
  infoMessage?: string | undefined;
  links?: Link[] | undefined;
  data?: AccessResultDto | undefined;
  executionDate?: Date | undefined;
}


export class ApiResultDto {
  success?: boolean | undefined;
  information?: string | undefined;
}

export class WrapperOfApiResultDto {
  statusCode?: number | undefined;
  errorMessage?: string | undefined;
  infoMessage?: string | undefined;
  links?: Link[] | undefined;
  data?: ApiResultDto | undefined;
  executionDate?: Date | undefined;
}



export class UserDto {
  id?: string | undefined;
  name?: string | undefined;
  userAgent?: string | undefined;
  ipAddr?: string | undefined;  
  lastContactDate?: Date | undefined;    
}

export class WrapperOfIEnumerableOfUserDto {
  statusCode?: number | undefined;
  errorMessage?: string | undefined;
  infoMessage?: string | undefined;
  links?: Link[] | undefined;
  data?: UserDto[] | undefined;
  executionDate?: Date | undefined;
}

    


