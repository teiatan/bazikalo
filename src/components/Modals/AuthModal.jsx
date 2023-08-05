import PropTypes from "prop-types";
import { useState } from "react";
import { ModalCover } from "./ModalCover";
import { authenticate } from "../../api/ajaxRequests";
import { validateName } from "../../utils/nameValidation";
import { useModal, useUser } from "../../hooks/contextHooks";

export const AuthModal = () => {
  const onClose=useModal().closeModal;
  const changeModal=useModal().setOpenedModal;
  const [userName, setUserName] = useState("");
  const [userNameValidation, setUserNameValidation] = useState("unknown");
  const [areRulesAccepted, setAreRulesAccepted] = useState(false);
  const {setUser} = useUser();
  const handleSubmit = async () => {
    const data = await authenticate(userName);
    setUser(data);
    onClose();
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleInputChange = (e) => {
    setUserName(e.target.value);
    validateName(e.target.value).then((res) => setUserNameValidation(res));
  };

  const nameValidationRule =
    areRulesAccepted && userName !== "" && userNameValidation.isValid;

  return (
    <ModalCover
      buttonStyles="hidden"
      wrapperStyles="bg-GeneralBgC dark:bg-dkGeneralBgC"
      containerStyles="bg-GeneralBgC dark:bg-dkGeneralBgC"
    >
      <form className="h-full flex flex-col justify-center items-center p-4 text-lg">
        <h2 className="text-3xl">Вітаємо у чаті Базікало!</h2>

        <label htmlFor="userName" className="text-center mb-[20px]">
          Введіть своє ім’я чи нікнейм та спілкуйтесь без обмежень
          <input
            type="text"
            name="userName"
            id="userName"
            autoFocus
            autoComplete="off"
            placeholder="Мій нікнейм"
            className="border mt-[20px] w-[40%] border-dkPrimaryBorderC focus:hove:active:border-dkPrimaryBorderC rounded-lg pl-4 bg-GeneralBgC dark:bg-dkGeneralBgC"
            value={userName}
            onChange={handleInputChange}
          />
          {!userNameValidation.isValid && (
            <p className="text-xs text-red-600">{userNameValidation?.error}</p>
          )}
        </label>

        <label htmlFor="rulesAcception">
          <input
            type="checkbox"
            name="rulesAcception"
            id="rulesAcception"
            value={areRulesAccepted}
            onChange={() => setAreRulesAccepted(!areRulesAccepted)}
          />
          Погоджуюсь з{" "}
          <button
            type="button"
            className="underline"
            onClick={() => changeModal("Rules")}
          >
            правилами чату
          </button>
        </label>
        <button
          type="submit"
          className={` bg-dkSecondaryBgC text-white my-[30px] p-2 rounded-lg cursor-pointer ${
            nameValidationRule ? "opacity-100" : "opacity-30"
          }`}
          title={
            !nameValidationRule
              ? "Щоб приєднатися до чату, введіть, будь ласка, валідний нік і погодьтеся з правилами"
              : "Перейти до чату"
          }
          onClick={handleClick}
          disabled={!nameValidationRule}
        >
          Вперед до спілкування!
        </button>
      </form>
    </ModalCover>
  );
};

AuthModal.propTypes = {
  onClose: PropTypes.func,
  changeModal: PropTypes.func,
  setUser: PropTypes.func,
};
