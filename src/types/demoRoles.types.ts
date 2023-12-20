import {PermissionProps} from './demoPermissions.types';

export type RolesObjectProps = {
    id: string, 
    name: string, 
    permissions: PermissionProps,
};
  
export type RolesProps = RolesObjectProps[];