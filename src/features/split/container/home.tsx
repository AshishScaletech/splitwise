import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ExpenseForm from '../component/addGroupForm';
import ExpenseList from '../component/expenceList';
import { isEmpty, size } from 'lodash';
import CustomModal from 'shared/modal/modal';
import { FormikValues } from 'formik';
import { CloseIcon } from 'shared/components/icons/icons';
import AddGroupForm from '../component/addGroupForm';

export interface Expense {
    id: string;
    description: string;
    amount: number;
    split: number;
    groupId?: string;
}

export interface IUserList {
    value: string;
    label: string;
    id: string;
    expence?: number;
}

export interface Member {
    id: string;
    name: string;
}

export interface Group {
    id: string;
    groupName: string;
    TotalBalance: number;
    users: IUserList[];
    expense: Expense[]
}

export interface IAllGroup {
    Groups: Group[];
}



const Home: React.FC = () => {
    const groupData = JSON.parse(localStorage.getItem('groups') as string);
    const [allGroup, setAllGroups] = useState<IAllGroup>({
        Groups: groupData?.Groups || groupData || [],
    })

    const [action, setAction] = useState('groups')
    const [id, setId] = useState('');

    const handleSubmit = useCallback((values: any) => {
        let tempObj = { ...allGroup }
        const newArr = [...tempObj.Groups]
        newArr.push({ ...values, expense: [] })
        tempObj = { ...tempObj, Groups: newArr }
        setAllGroups(tempObj)
        localStorage.setItem('groups', JSON.stringify(tempObj))
        setAction('groups');
    }, [allGroup])


    const handleExpence = useCallback((values: any) => {
        let tempObj = [...allGroup.Groups]
        const index = tempObj.findIndex((data) => data.id === id);
        const copyOfExpense = [...tempObj[index].expense];
        copyOfExpense.push(values);
        tempObj[index] = {
            ...tempObj[index],
            expense: copyOfExpense
        };

        let tempArr = { ...tempObj[index] }
        tempArr = { ...tempArr, TotalBalance: Number(tempArr.TotalBalance) + Number(values.amount) }

        const copyUsers = [...tempArr.users]
        const splitAmount = Number(values.amount) / copyUsers.length
        const updatedUserExpense = copyUsers.map((item: IUserList) => {

            return {
                ...item, expence: Number(item.expence) + Number(splitAmount.toFixed(2))
            }
        })
        tempArr = {
            ...tempArr,
            users: updatedUserExpense
        }
        tempObj.splice(index, 1, tempArr)


        localStorage.setItem('groups', JSON.stringify(tempObj))
        setAllGroups({ Groups: tempObj })
    }, [allGroup, id,]);


    return (
        <div className='container center bg--white border-radius--xxl'>
            <div className='position--relative height--full'>
                <div className='header font-size--22 text--center flex align-items--center justify-content--center'>splitwise</div>
                {action === 'add' && (

                    <CustomModal show handleClose={() => setAction('users')} modalTitle={'Add Group'} className='position--relative'>
                        <div className=''>
                            <div className='close-btn flex align-items--center justify-content--center cursor--pointer' onClick={() => setAction('users')}>
                                <CloseIcon className="stroke--white width--16px height--16px" />
                            </div>
                            <AddGroupForm options={options} handleSubmit={handleSubmit} />
                        </div>
                    </CustomModal>
                )}
                <div className='content'>

                    {action === 'users' && (
                        <div>
                            <p className='font--bold font-size--22'>FriendsList</p>
                            {!isEmpty(options) && options.map((user) => {

                                return (
                                    <div className='list-item mb--5'>
                                        <p className='p--10'>{user.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {action === 'groups' && (
                        <div>
                            <p className='font--bold font-size--22'>GroupList</p>
                            {allGroup.Groups.length > 0 && allGroup.Groups.map((user: Group) => {
                                return (
                                    <div className='list-item mb--5 flex align-items--center justify-content--between' onClick={() => {
                                        setAction('expense')
                                        setId(user.id)
                                    }}>
                                        <p className='p--10'>{user.groupName}</p>
                                        <p>TotalBalance:{user.TotalBalance}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {action === 'expense' && (
                        <ExpenseList options={options} allGroup={allGroup} handleExpence={handleExpence} id={id} />
                    )}
                </div>
                <div className='position--absolute width--full flex justify-content--between align-items--center bottom-penal'>
                    <div className='cursor--pointer' onClick={() => setAction('users')}>users</div>
                    <div className='cursor--pointer' onClick={() => setAction('add')}>AddGroup</div>
                    <div className='cursor--pointer' onClick={() => setAction('groups')}>groups</div>
                </div>
            </div>
        </div>
    );
}

const options: IUserList[] = [
    { value: 'johan', label: 'Johan', id: 'johan', expence: 0 },
    { value: 'ander', label: 'Ander', id: 'ander', expence: 0 },
    { value: 'dooren', label: 'Dooren', id: 'dooren', expence: 0 },
    { value: 'jems', label: 'Jems', id: 'jems', expence: 0 },
    { value: 'tom', label: 'Tom', id: 'tom', expence: 0 },
    { value: 'michal', label: 'Michal', id: 'michal', expence: 0 }
]


export default Home