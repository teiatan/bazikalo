import PropTypes from "prop-types";
import { useState } from "react";
import { ModalCover } from "./ModalCover";
import { authenticate } from "../../api/ajaxRequests";

export const AuthModal = ({ onClose, changeModal, setUser }) => {
  const [userName, setUserName] = useState("");
  const [areRulesAccepted, setAreRulesAccepted] = useState(false);

  const handleSubmit = async () => {
    const data = await authenticate(userName);
    setUser(data);
    onClose();
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!areRulesAccepted || userName === "") {
      alert(
        "Щоб приєднатися до чату, введіть, будь ласка, свій нік і погодьтеся з правилами"
      );
    } else {
      handleSubmit();
    }
  };

  return (
    <ModalCover
      buttonStyles="hidden"
      wrapperStyles="bg-white"
      containerStyles="bg-white"
    >
      <form className="h-full flex flex-col justify-center items-center p-4 text-lg">
        <h2 className="text-3xl">Вітаємо у чаті Базікало!</h2>

        <label htmlFor="userName" className="text-center">
          Введіть своє ім’я чи нікнейм та спілкуйтесь без обмежень
          <input
            type="text"
            name="userName"
            id="userName"
            autoFocus
            autoComplete="off"
            placeholder="Мій нікнейм"
            className="border my-[20px] w-[40%] border-slate-950 rounded-lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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
          className={`bg-black text-white my-[30px] p-2 rounded-lg cursor-pointer ${
            areRulesAccepted && userName !== "" ? "opacity-100" : "opacity-30"
          }`}
          title={
            !areRulesAccepted || userName === ""
              ? "Щоб приєднатися до чату, введіть, будь ласка, свій нік і погодьтеся з правилами"
              : ""
          }
          onClick={handleClick}
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
