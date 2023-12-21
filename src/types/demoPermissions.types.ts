export type PermissionObjectProps = {
    id : string,
    name: string,
};

export interface PermissionsFromCheckBox {
    [role: string]: string[];
}
  
export type PermissionProps = PermissionObjectProps[];