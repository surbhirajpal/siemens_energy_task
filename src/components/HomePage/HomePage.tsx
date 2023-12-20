import {useState } from 'react';

import DemoPermissions from '../../data/demoPermissions.json';
import DemoRoles from '../../data/demoRoles.json';

import { PermissionProps, PermissionObjectProps } from '../../types/demoPermissions.types';
import { RolesProps } from '../../types/demoRoles.types';

import './HomePage.scss';

const HomePage = () => {
    const [roles, setRoles] = useState<RolesProps>(DemoRoles);
    const [permissions, setPermissions] = useState<PermissionProps>(DemoPermissions);

    const handleEditPermission = (roleId: string, permission: PermissionObjectProps) => {
        const dummyRoles = [...roles]
        const roleIndex = dummyRoles.findIndex((role) => role.id === roleId);
        dummyRoles[roleIndex].permissions = [permission];
        setRoles(dummyRoles)
    }

    return (
        <div className='homepage'>
            <h1>{'Roles Dashboard'}</h1>
            <div>
                {
                    roles.map((role) => {
                        return (
                            <div>
                                <p key={role.id}>
                                    {`Name - ${role.name}`}
                                </p>
                                <p>
                                    {`Permissions - ${role.permissions?.map((permission) => permission.name).join(', ')}`}
                                </p>
                                <p>{'Edit Permissions'}</p>
                                {
                                    permissions.map((permission) => {
                                        if (role.permissions.includes(permission)) {
                                            return null
                                        }
                                        return (
                                            <p onClick={() => handleEditPermission(role.id, permission)}>
                                                {permission.name}
                                            </p>
                                        )
                                    })
                                }
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HomePage;