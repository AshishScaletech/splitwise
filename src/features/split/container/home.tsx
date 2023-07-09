import React, { useCallback, useState } from "react";
import ExpenseList from "../component/expenceList";
import { isEmpty } from "lodash";
import CustomModal from "shared/modal/modal";
import { CloseIcon } from "shared/components/icons/icons";
import AddGroupForm from "../component/addGroupForm";

import groups from "../../../assets/Images/groups.png";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  split: number;
  groupId?: string;
  paidBy: string;
}

export interface IUserList {
  value: string;
  label: string;
  id: string;
  expence: {
    borrow: number;
    lend: number;
  };
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
  expense: Expense[];
}

export interface IAllGroup {
  Groups: Group[];
}

const Home: React.FC = () => {
  const groupData = JSON.parse(localStorage.getItem("groups") as string);
  const [allGroup, setAllGroups] = useState<IAllGroup>({
    Groups: groupData?.Groups || groupData || [],
  });
  const [isAdd, setIsAdd] = useState(false);
  const [action, setAction] = useState("groups");
  const [id, setId] = useState("");

  const handleSubmit = useCallback(
    (values: any) => {
      let tempObj = { ...allGroup };

      const newArr = [...tempObj.Groups];
      newArr.push({ ...values, expense: [] });
      tempObj = { ...tempObj, Groups: newArr };
      setAllGroups(tempObj);
      localStorage.setItem("groups", JSON.stringify(tempObj));
      setAction("groups");
    },
    [allGroup]
  );

  const handleExpence = useCallback(
    (values: any) => {
      let tempObj = [...allGroup.Groups];
      const index = tempObj.findIndex((data) => data.id === id);
      const copyOfExpense = [...tempObj[index].expense];
      copyOfExpense.push({ ...values });

      tempObj[index].TotalBalance =
        Number(tempObj[index].TotalBalance) + Number(values.amount);

      tempObj[index].users.map((user) => {
        if (user.id === values.paidBy) {
          user.expence.lend =
            user.expence.lend +
            (values.amount / tempObj[index].users.length) *
              (tempObj[index].users.length - 1);
        } else {
          user.expence.borrow =
            user.expence.borrow + values.amount / tempObj[index].users.length;
        }
      });
      

      tempObj[index] = {
        ...tempObj[index],
        expense: copyOfExpense,
      };
      localStorage.setItem("groups", JSON.stringify(tempObj));
      setAllGroups({ Groups: tempObj });
      setIsAdd(false);
    },
    [allGroup, id]
  );

  return (
    <div className="container center bg--white border-radius--xxl">
      <div className="position--relative height--full">
        <div className="header font-size--22 text--center flex align-items--center justify-content--center">
          splitWise
        </div>
        {action === "add" && (
          <CustomModal
            show
            handleClose={() => setAction("users")}
            modalTitle={"Add Group"}
            className="position--relative"
          >
            <div className="">
              <div
                className="close-btn flex align-items--center justify-content--center cursor--pointer"
                onClick={() => setAction("users")}
              >
                <CloseIcon className="stroke--white width--16px height--16px" />
              </div>
              <AddGroupForm options={options} handleSubmit={handleSubmit} />
            </div>
          </CustomModal>
        )}
        <div className="content">
          {action === "users" && (
            <div>
              <p className="font--bold font-size--22">FriendsList</p>
              {!isEmpty(options) &&
                options.map((user) => {
                  return (
                    <div className="list-item mb--5">
                      <p className="p--10">{user.label}</p>
                    </div>
                  );
                })}
            </div>
          )}
          {action === "groups" && (
            <>
              <p className="font--bold font-size--22">GroupList</p>
              <div className="">
                {allGroup.Groups.length > 0 &&
                  allGroup.Groups.map((user: Group) => {
                    return (
                      <div
                        className="group--bg cursor--pointer text--white list-item mb--20  mt--15 flex align-items--center justify-content--between"
                        onClick={() => {
                          setAction("expense");
                          setId(user.id);
                        }}
                      >
                        <img
                        src={groups}
                        alt=""
                        className="width--5"
                      />
                        <p className="p--10">{user.groupName}</p>
                        <p>Total Expense : ₹ {(user.TotalBalance).toFixed(2)}</p>
                      </div>
                    );
                  })}
                {!allGroup.Groups.length && (
                  <div className="group-wrapper width--full text--center flex flex--column align-items--center justify-content--center">
                    <div className="width--20 height--20">
                      <img
                        src={groups}
                        alt=""
                        className="width--full height--full"
                      />
                    </div>
                    <button
                      type="button"
                      className="login-btn font-size--lg width--50 text--uppercase text--white border-radius--default no--border bg--primary"
                      onClick={() => setAction("add")}
                    >
                      Add New Group
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {action === "expense" && (
            <ExpenseList
              allGroup={allGroup}
              setIsAdd={(isAdded: boolean) => setIsAdd(isAdded)}
              isAdd={isAdd}
              handleExpence={handleExpence}
              id={id}
            />
          )}
        </div>
        <div className="position--absolute width--full flex justify-content--between align-items--center bottom-penal">
          <div className="cursor--pointer" onClick={() => setAction("users")}>
            users
          </div>
          <div className="cursor--pointer" onClick={() => setAction("add")}>
            AddGroup
          </div>
          <div className="cursor--pointer" onClick={() => setAction("groups")}>
            groups
          </div>
          
        </div>
      </div>
    </div>
  );
};

const options: IUserList[] = [
  {
    value: "johan",
    label: "Johan",
    id: "johan",
    expence: { borrow: 0, lend: 0 },
  },
  {
    value: "ander",
    label: "Ander",
    id: "ander",
    expence: { borrow: 0, lend: 0 },
  },
  {
    value: "dooren",
    label: "Dooren",
    id: "dooren",
    expence: { borrow: 0, lend: 0 },
  },
  { value: "jems", label: "Jems", id: "jems", expence: { borrow: 0, lend: 0 } },
  { value: "tom", label: "Tom", id: "tom", expence: { borrow: 0, lend: 0 } },
  {
    value: "michal",
    label: "Michal",
    id: "michal",
    expence: { borrow: 0, lend: 0 },
  },
];

export default Home;
