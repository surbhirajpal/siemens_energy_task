import { useState } from 'react';

import DemoPermissions from '../../data/demoPermissions.json';
import DemoRoles from '../../data/demoRoles.json';

import {
    PermissionProps,
    PermissionsFromCheckBox
} from '../../types/demoPermissions.types';
import { RolesProps } from '../../types/demoRoles.types';

import './HomePage.scss';


const HomePage = () => {
    //Create an object of roles with empty array of permissions
    // To be updated when user selected checkboxes from 'modify permissions'
    let checkboxPermission: PermissionsFromCheckBox = {};
    DemoRoles.map((role) => {
        checkboxPermission[role.name] = [];
    });

    //STATES
    const [roles, setRoles] = useState<RolesProps>(DemoRoles);
    const [permissions, setPermissions] = useState<PermissionProps>(DemoPermissions);
    const [permissionsFromCheckbox, setPermissionFromCheckBox] = useState<PermissionsFromCheckBox>(checkboxPermission);
    const [showModifyIndex, setShowModifyIndex] = useState<number | null>(null);

    //FUNCTIONS
    const handleClick = (roleName: string) => {
        const rolePermissions = permissionsFromCheckbox[roleName];
        const dummyRoles = [...roles];
        const roleIndex = dummyRoles.findIndex((role) => role.name === roleName);
        dummyRoles[roleIndex].permissions = [];
        rolePermissions.map((rolePermission, index) => {
            const selectedPermission = permissions.find((p) => p.name === rolePermission);
            if (selectedPermission) {
                dummyRoles[roleIndex].permissions[index] = selectedPermission;
            }
        });

        setRoles(dummyRoles);
        setShowModifyIndex(null);
    }

    const handleCheckBoxClick = (roleName: string, permissionName: string, checked: boolean) => {
        const dummyPermission = { ...permissionsFromCheckbox };
        if (checked) {
            //if checked, add it in the list
            dummyPermission[roleName][dummyPermission[roleName].length] = permissionName;
        } else {
            //if already exist, remove from the list
            const updatedPermission: string[] = dummyPermission[roleName].filter((p) => p !== permissionName);
            dummyPermission[roleName] = updatedPermission;
        }
        setPermissionFromCheckBox(dummyPermission);
    }



    return (
        <section className='home'>
            <div className='container'>
                <h1 className='home__title'>{'User Management'}</h1>

                <table className='home__table'>
                    <thead>
                        <tr>
                            <th className='home__table-name'>{'Name'}</th>
                            <th className='home__table-permission'>{'User Permissions'}</th>
                            <th className='home__table-action'>{'Action'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map((role, index) => {
                                return (
                                    <tr key={index}>
                                        <th className='home__role-name'>{role.name}</th>
                                        <th>
                                            {role.permissions?.map((permission, index2) => {
                                                return (
                                                    <span
                                                        key={index2}
                                                        id={permission.name}
                                                        className='home__role'
                                                    >
                                                        {permission.name}
                                                    </span>
                                                )
                                            })}
                                        </th>
                                        <th>
                                            <div className='home__modify-roles' onClick={() =>
                                                showModifyIndex === index ?
                                                    setShowModifyIndex(null)
                                                    : setShowModifyIndex(index)
                                            }>
                                                <img
                                                    src='/images/settings-icon.png'
                                                    alt='settings-icon'
                                                />
                                                <p>{'Modify Permissions'}</p>
                                            </div>
                                            <div className={`home__permission-form`}
                                            style={{ display: showModifyIndex === index ? 'block' : 'none' }}
                                            >
                                                {
                                                    DemoPermissions.map((permission) => {
                                                        return (
                                                            <div className='home__checkbox-wrapper'>
                                                                <input
                                                                    className='home__checkbox'
                                                                    onChange={(event) => handleCheckBoxClick(role.name, permission.name, event?.target.checked)}
                                                                    type='checkbox'
                                                                />
                                                                <label>{permission.name}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <button
                                                    className='home__permission-button'
                                                    onClick={() => handleClick(role.name)}
                                                >
                                                    {'Update Roles'}
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default HomePage;