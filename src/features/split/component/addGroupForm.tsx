
import React from 'react';
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
            {({ values, setFieldValue, handleSubmit, resetForm, dirty }) => (

                <form className='flex flex--column mt--15' aria-required onSubmit={handleSubmit}>
                    <div className='form-item mb--25 position--relative '>

                        <input
                            type="text"
                            className='width--full'
                            name='groupName'
                            placeholder="GroupName"
                            onChange={(e) => setFieldValue('groupName', e.target.value)}
                        />
                    </div>

                    <div className='form-item mb--25 position--relative width--full'>

                        <Select options={options} name='users' components={animatedComponents}
                            isMulti onChange={(selected) => {
                                setFieldValue('users', selected);
                            }} />
                    </div>
                    <button type="submit" className='login-btn font-size--lg width--full text--uppercase text--white border-radius--default no--border bg--primary'>Add Group</button>
                </form>
            )}
        </Formik>
    );
}


export default AddGroupForm;