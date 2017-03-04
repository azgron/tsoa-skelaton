/* tslint:disable */
import { ValidateParam } from 'tsoa';
import { AccountsController } from './app/account/accounts.controller';
import { UsersController } from './app/user/users.controller';

const models: any={
'User': {
'id': { typeName: 'number',required: true },
'email': { typeName: 'string',required: true },
'createdAt': { typeName: 'datetime',required: true },
},
'Account': {
'id': { typeName: 'number',required: true },
'address': { typeName: 'string',required: false },
'name': { typeName: 'string',required: true },
'users': { typeName: 'array',required: false,arrayType: 'User' },
'fields': { typeName: 'array',required: false,arrayType: 'string' },
},
'UserCreateRequest': {
'email': { typeName: 'string',required: true },
},
'UserUpdateRequest': {
'createdAt': { typeName: 'datetime',required: false },
'email': { typeName: 'string',required: true },
},
};


/* tslint:disable:forin */
export function RegisterRoutes(app: any) {
app.get('/v1/Accounts/Current',
function(req: any,res: any,next: any) {
const params={
'someFlag': { typeName: 'boolean',required: true },
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'');
} catch(err) {
return next(err);
}

const controller=new AccountsController();
promiseHandler(controller.current.apply(controller,validatedParams),res,next);
});
app.get('/v1/Accounts/Users',
function(req: any,res: any,next: any) {
const params={
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'');
} catch(err) {
return next(err);
}

const controller=new AccountsController();
promiseHandler(controller.getUsers.apply(controller,validatedParams),res,next);
});
app.get('/v1/Users/Current',
function(req: any,res: any,next: any) {
const params={
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'');
} catch(err) {
return next(err);
}

const controller=new UsersController();
promiseHandler(controller.Current.apply(controller,validatedParams),res,next);
});
app.get('/v1/Users/:userId',
function(req: any,res: any,next: any) {
const params={
'userId': { typeName: 'number',required: true },
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'');
} catch(err) {
return next(err);
}

const controller=new UsersController();
promiseHandler(controller.Get.apply(controller,validatedParams),res,next);
});
app.post('/v1/Users',
function(req: any,res: any,next: any) {
const params={
'request': { typeName: 'UserCreateRequest',required: true },
'optionalString': { typeName: 'string',required: false },
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'request');
} catch(err) {
return next(err);
}

const controller=new UsersController();
promiseHandler(controller.Create.apply(controller,validatedParams),res,next);
});
app.delete('/v1/Users/:userId',
function(req: any,res: any,next: any) {
const params={
'userId': { typeName: 'number',required: true },
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'');
} catch(err) {
return next(err);
}

const controller=new UsersController();
promiseHandler(controller.Delete.apply(controller,validatedParams),res,next);
});
app.patch('/v1/Users',
function(req: any,res: any,next: any) {
const params={
'request': { typeName: 'UserUpdateRequest',required: true },
};

let validatedParams: any[]=[];
try {
validatedParams=getValidatedParams(params,req,'request');
} catch(err) {
return next(err);
}

const controller=new UsersController();
promiseHandler(controller.Update.apply(controller,validatedParams),res,next);
});


function promiseHandler(promise: any,response: any,next: any) {
return promise
.then((data: any) => {
if(data) {
response.json(data);
} else {
response.status(204);
response.end();
}
})
.catch((error: any) => next(error));
}

function getRequestParams(request: any,bodyParamName?: string) {
const merged: any={};
if(bodyParamName) {
merged[bodyParamName]=request.body;
}

for(let attrname in request.params) { merged[attrname]=request.params[attrname]; }
for(let attrname in request.query) { merged[attrname]=request.query[attrname]; }
return merged;
}

function getValidatedParams(params: any,request: any,bodyParamName?: string): any[] {
const requestParams=getRequestParams(request,bodyParamName);

return Object.keys(params).map(key => {
if(params[key].injected==='inject') {
return undefined;
} else if(params[key].injected==='request') {
return request;
} else {
return ValidateParam(params[key],requestParams[key],models,key);
}
});
}
}