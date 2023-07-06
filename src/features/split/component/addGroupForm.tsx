
import React, { useCallback, useState } from 'react';
import { IUserList } from '../container/home';
import Select, { ActionMeta, MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import uuid from 'react-uuid';


interface Iprops {
    options: IUserList[],
    handleSubmit: (values: FormikValues) => void
}




const AddGroupForm: React.FC<Iprops> = ({ options, handleSubmit }) => {
    const animatedComponents = makeAnimated();

    return (
        <Formik
            initialValues={{
                groupName: '',
                id: uuid(),
                users: [],
                TotalBalance: 0
            }}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, handleSubmit, resetForm }) => (

                <form className='flex flex--column mt--15' onSubmit={handleSubmit}>
                    <div className='form-item mb--25 position--relative '>

                        <input
                            type="text"
                            className='width--full'
                            name='groupName'
                            placeholder="GroupName"
                            // value={title}
                            onChange={(e) => setFieldValue('groupName', e.target.value)}
                        />
                    </div>

                    <div className='form-item mb--25 position--relative width--full'>

                        <Select options={options} name='users' components={animatedComponents}
                            isMulti onChange={(selected) => {
                                // const UserId = selected.map((item: any) => item.id)

                                setFieldValue('users', selected);
                            }} />
                    </div>
                    <button type="submit" className='login-btn font-size--lg width--full text--uppercase text--white border-radius--default no--border bg--primary'>Add Expense</button>
                </form>
            )}
        </Formik>
    );
}




const initialValues = {
    groupName: '',
    id: uuid(),
    users: []
}



export default AddGroupForm;