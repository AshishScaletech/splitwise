import React, { useCallback, useState } from "react";
import { Expense, Group, IAllGroup, IUserList } from "../container/home";
import CustomModal from "shared/modal/modal";
import { CloseIcon } from "shared/components/icons/icons";
import ExpenseForm from "./addGroupForm";
import ExpenceForm from "./ExpenceForm";
import { isEmpty } from "lodash";
import person from "../../../assets/Images/person.png";
import money from "../../../assets/Images/money.svg";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
import { Formik, FormikValues } from "formik";

interface Iprops {
  allGroup: IAllGroup;
  id: string;
  isAdd: boolean;
  setIsAdd: (isAdd: boolean) => void;
  handleExpence: (values: FormikValues) => void;
}

const ExpenseList: React.FC<Iprops> = ({
  handleExpence,
  setIsAdd,
  isAdd,
  allGroup,
  id,
}) => {
  const [settelUser, setSettleUser] = useState({
    name: "",
    amount: 0,
  });
  const [isSattel, setIsSettel] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const selectedOptions = allGroup.Groups.filter((item: any) => item.id === id);

  const options = selectedOptions[0].users;

  const findIndex = allGroup.Groups.findIndex((group) => group.id === id);
  const selectedExpense = allGroup.Groups[findIndex].expense.filter(
    (item: any) => item.id === id
  );


  return (
    <>
      <ul>
        <p className="font-size--20 font--bold align-items--center flex justify-content--between person--expens mb--20">
          <span>Person Wise Expens</span>
          <button
            className="btn-login bg--primary text--white width--20"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            addExpence
          </button>
        </p>
        {!isEmpty(selectedOptions[0].users) &&
          selectedOptions[0].users.map((user: any) => {
            return (
              <li className="person--expens flex align-items--center flex justify-content--between">
                <div className="flex align-items--center">
                  <div className="width--30px height--30px person-img">
                    <img
                      src={person}
                      className="width--full height--full"
                      alt=""
                    />
                  </div>
                  <p className="ml--15">{user.label}</p>
                </div>
                <p className="flex flex--column">
                  {user.expence.lend - user.expence.borrow > 0 && (
                    <div className="flex flex--column justify-content--end align-items--end">
                      <span className="text--green">You lent</span>
                      <span>
                       ₹ {Math.abs(
                          user.expence.lend - user.expence.borrow
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {user.expence.lend - user.expence.borrow < 0 && (
                    <div className="flex flex--column justify-content--end align-items--end">
                      <span className="text--red-500">You borrowed</span>
                      <span>
                        ₹ {Math.abs(
                          user.expence.lend - user.expence.borrow
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </p>
              </li>
            );
          })}

        <div>
          <p className="font-size--20 font--bold align-items--center flex justify-content--between person--expens mb--15 mt--20">
            Expence List :{" "}
          </p>
          {isEmpty(selectedOptions[0].users) && <li>No Expence </li>}
        </div>
      </ul>

      <div className="align-items--center">
        {!isEmpty(selectedExpense) &&
          selectedExpense.map((expence: Expense) => {
            return (
              <ul className="person--expens flex align-items--center flex justify-content--between">
                <div className="flex align-items--center">
                  <div className="width--30px height--30px">
                    <img
                      src={money}
                      className="width--full height--full"
                      alt=""
                    />
                  </div>
                  <li className="ml--15">{expence.description}</li>
                </div>
                <p>{`${expence.paidBy} paid ₹ ${expence.amount}`}</p>
                {/* <button
                  className="btn btn-login"
                  onClick={() => {
                    setIsSettel(true);
                    setSelectedId(expence.paidBy);
                  }}
                >
                  sattleUp
                </button> */}

                {/* <p>{`${expence.paidBy} owes by ${selectedExp[1].id} ${selectedExp[0].expence.borrow}`}</p> */}
              </ul>
            );
          })}
      </div>

      {isAdd && (
        <CustomModal
          show
          handleClose={() => setIsAdd(false)}
          modalTitle={"Add Expense"}
          className="position--relative"
        >
          <div className="">
            <div
              className="close-btn flex align-items--center justify-content--center cursor--pointer"
              onClick={() => setIsAdd(false)}
            >
              <CloseIcon className="stroke--white width--16px height--16px" />
            </div>
            <ExpenceForm
              options={options}
              id={id}
              handleSubmit={handleExpence}
            />
          </div>
        </CustomModal>
      )}
      {/* {isSattel && (
        <CustomModal
          show
          handleClose={() => setIsAdd(false)}
          modalTitle={"Settel Expense"}
          className="position--relative"
        >
          <div className="">
            <div
              className="close-btn flex align-items--center justify-content--center cursor--pointer"
              onClick={() => setIsAdd(false)}
            >
              <CloseIcon className="stroke--white width--16px height--16px" />
            </div>
            <Formik initialValues={{ sellet: {} }} onSubmit={handleSubmit}>
              {({ values, setFieldValue, handleSubmit, resetForm }) => (
                <form className='flex flex--column mt--15' onSubmit={handleSubmit}>
                <Select
                  options={(anotherUser && anotherUser) || []}
                  name="sellet"
                  components={animatedComponents}
                  onChange={(selected: any) => {
                      setFieldValue('sellet', selected);
                    }}
                    />
                    <button type="submit" className='login-btn font-size--lg width--full text--uppercase text--white border-radius--default no--border bg--primary'>Add Expense</button>
                </form>
              )}
            </Formik>
          </div>
        </CustomModal>
      )} */}
    </>
  );
};

export default ExpenseList;
