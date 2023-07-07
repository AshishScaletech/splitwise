import React, { useState } from 'react';
import { IUserList } from '../container/home';
import makeAnimated from 'react-select/animated';
import { Formik, FormikValues } from 'formik';
import Select from 'react-select'


interface Iprops {
    options: IUserList[],
    handleSubmit: (values: FormikValues) => void,
    id: string;
}

const ExpenceForm: React.FC<Iprops> = ({ options, id, handleSubmit }) => {
    const animatedComponents = makeAnimated();

    return (
        <Formik
            initialValues={{
                description: '',
                amount: 0,
                id: id,
                paidBy: '',

            }}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, handleSubmit, resetForm }) => (

                <form className='flex flex--column mt--15' onSubmit={handleSubmit}>
                    <div className='form-item mb--25 position--relative '>
                        <p>Description:</p>
                        <input
                            type="text"
                            className='width--full'
                            name='description'
                            placeholder="Description"
                            // value={title}
                            onChange={(e) => setFieldValue('description', e.target.value)}
                        />
                    </div>
                    <div className='form-item mb--25 position--relative '>
                        <p>Amount:</p>
                        <input
                            type="number"
                            className='width--full'
                            name='amount'
                            placeholder="Amount"
                            // value={title}
                            onChange={(e) => setFieldValue('amount', e.target.value)}
                        />
                    </div>
                    {/* <div className='form-item mb--25 position--relative width--full'>
                        <p>select Users:</p>
                        <Select options={options} name='listId' components={animatedComponents}
                            isMulti onChange={(selected) => {
                                const UserId = selected.map((item: any) => item.id)

                                setFieldValue('listId', UserId);
                            }} />
                    </div> */}
                    <div className='form-item mb--25 position--relative width--full'>
                        <p>Paid By:</p>
                        <Select options={options} name='paidBy' components={animatedComponents}
                            onChange={(selected: any) => {
                                setFieldValue('paidBy', selected.id);
                            }} />
                    </div>
                    <div className='flex'>

                        <div className='flex form-item mb--25 position--relative width--20'>
                            Split:
                            <label className={`check-wrapper pointer`}>
                                <input
                                    type="checkbox"
                                    name="split"
                                    className="flex justify-content--center no--border"
                                    onChange={(e) => {
                                        setFieldValue('split', e.target.checked);
                                    }}
                                />
                                <span className={`checkmarks`} />
                            </label>

                        </div>
                    </div>
                    <button type="submit" className='login-btn font-size--lg width--full text--uppercase text--white border-radius--default no--border bg--primary'>Add Expense</button>
                </form>
            )}
        </Formik>
    );
}


export default ExpenceForm;