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
}

export interface IAllGroup {
    Groups: Group[];
    expenses: Expense[]
}



const Home: React.FC = () => {
    const groupData = JSON.parse(localStorage.getItem('groups') as string);
    const [allGroup, setAllGroups] = useState<IAllGroup>({
        Groups: groupData?.Groups || [],
        expenses: groupData?.expenses || []
    })
    // console.log("alllgr:", allGroup);

    // const [allGroup, setAllGroups] = useState<any>(JSON.parse(localStorage.getItem('groups') || '[]'));
    const [action, setAction] = useState('users')
    const [id, setId] = useState('');

    const handleSubmit = useCallback((values: any) => {
        let tempObj = { ...allGroup }
        const newArr = [...tempObj.Groups]
        newArr.push(values)
        tempObj = { ...tempObj, Groups: newArr }
        setAllGroups(tempObj)
        localStorage.setItem('groups', JSON.stringify(tempObj))
        setAction('groups');
    }, [allGroup])


    const handleExpence = useCallback((values: any) => {
        let tempObj = { ...allGroup }
        let newExpense = [...tempObj.expenses]
        newExpense.push(values)
        tempObj = { ...tempObj, expenses: newExpense }

        const selectedGroup = tempObj.Groups.filter(item => item.id === id)
        let tempGrpObj = { ...selectedGroup[0] }
        tempGrpObj = { ...tempGrpObj, TotalBalance: Number(tempGrpObj.TotalBalance) + Number(values.amount) }
        console.log('tempGrpObj', tempGrpObj)
        const tempUserArray = [...tempGrpObj.users]
        const splitamount = (values.amount / size(tempUserArray)).toFixed(2)
        const updatedArr = tempUserArray.map((item: any) => {
            return {
                ...item,
                expence: Number(item.expence) + Number(splitamount)
            }
        })
        tempGrpObj = {
            ...tempGrpObj,
            users: updatedArr
        }
        const tempArr = [...allGroup.Groups]
        const index = tempArr.findIndex((item: any) => item.id === tempGrpObj.id)
        if (index !== -1) {
            tempArr.splice(index, 1, tempGrpObj)
        }
        const updateState = {
            Groups: tempArr,
            expenses: newExpense
        }
        console.log('updateState', updateState)
        localStorage.setItem('groups', JSON.stringify(tempObj))
        setAllGroups(updateState)
        console.log('tempGrpObj', tempGrpObj)
        console.log('tempArr', tempArr)
        // const userLength = selectedGroup[0].users.length

        // console.log("splitamount:", splitamount);


    }, [allGroup]);


    //     setExpenses([...expenses, newExpense]);
    // };

    // const deleteExpense = (id: string) => {
    //     setExpenses(expenses.filter((expense) => expense.id !== id));
    // };

    // const splitExpense = (id: string, amount: number, numPeople: number, groupId?: string) => {
    //     const updatedExpenses = expenses.map((expense) => {
    //         if (expense.id === id) {
    //             return {
    //                 ...expense,
    //                 amount: expense.amount / numPeople,
    //                 split: numPeople,
    //                 groupId,
    //             };
    //         }
    //         return expense;
    //     });

    //     setExpenses(updatedExpenses);
    // };

    // const calculateBalance = (): number => {
    //     let totalAmount = 0;
    //     expenses.forEach((expense) => {
    //         totalAmount += expense.amount;
    //     });
    //     return totalAmount / expenses.length;
    // };

    // const addGroup = (newGroup: Group) => {
    //     setGroups([...groups, newGroup]);
    // };

    // const deleteGroup = (id: string) => {
    //     setGroups(groups.filter((group) => group.id !== id));
    // };

    // const calculateGroupBalance = (groupId: string): number => {
    //     let totalAmount = 0;
    //     expenses.forEach((expense) => {
    //         if (expense.groupId === groupId) {
    //             totalAmount += expense.amount;
    //         }
    //     });
    //     return totalAmount;
    // };
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
                                    <div className='list-item mb--5 flex' onClick={() => {
                                        setAction('expense')
                                        setId(user.id)
                                    }}>
                                        <p className='p--10'>{user.groupName}</p>
                                        <p>{user.TotalBalance}</p>
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
        </div >
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