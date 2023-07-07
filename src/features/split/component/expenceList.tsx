import React, { useCallback, useState } from 'react';
import { Expense, Group, IAllGroup, IUserList } from '../container/home';
import CustomModal from 'shared/modal/modal';
import { CloseIcon } from 'shared/components/icons/icons';
import ExpenseForm from './addGroupForm';
import { FormikValues } from 'formik';
import ExpenceForm from './ExpenceForm';
import { isEmpty } from 'lodash';


interface Iprops {
    options: IUserList[];
    allGroup: IAllGroup;
    id: string;
    handleExpence: (values: FormikValues) => void;
}


const ExpenseList: React.FC<Iprops> = ({ handleExpence, allGroup, id }) => {
    const [isAdd, setIsAdd] = useState(false);
    const selectedOptions = allGroup.Groups.filter((item: any) => item.id === id)
    const options = selectedOptions[0].users;
    const findIndex = allGroup.Groups.findIndex((group) => group.id === id);
    const selectedExpense = allGroup.Groups[findIndex].expense.filter((item: any) => item.id === id)

    return (
        <>
            <ul>

                <button onClick={() => {
                    setIsAdd(true)
                }}>addExpence</button>

                <li>Person expens</li>
                {!isEmpty(selectedOptions[0].users) && selectedOptions[0].users.map((user: any) => {
                    return (
                        <li>
                            <p>{user.label}</p>
                            <p>Expence:{user.expence}</p>
                        </li>
                    )
                })}

                <div>
                    <p>Expence List : </p>
                    {isEmpty(selectedOptions[0].users) && (
                        <li>No Expence </li>
                    )}
                </div>
            </ul>

            <div>
                {!isEmpty(selectedExpense) && selectedExpense.map((expence: Expense) => (
                    <ul>
                        <li>{expence.description}</li>
                        <li>{expence.amount}</li>
                    </ul>
                ))}
            </div>

            {isAdd && (

                <CustomModal show handleClose={() => setIsAdd(false)} modalTitle={'Add Group'} className='position--relative'>
                    <div className=''>
                        <div className='close-btn flex align-items--center justify-content--center cursor--pointer' onClick={() => setIsAdd(false)}>
                            <CloseIcon className="stroke--white width--16px height--16px" />
                        </div>
                        <ExpenceForm options={options} id={id} handleSubmit={handleExpence} />
                    </div>
                </CustomModal>
            )
            }
        </>
    );
}

export default ExpenseList;