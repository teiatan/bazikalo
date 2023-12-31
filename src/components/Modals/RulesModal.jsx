import PropTypes from "prop-types";
import { ModalCover } from "./ModalCover";
import { useModal, useUser } from "../../hooks/contextHooks";

export const RulesModal = () => {
  const onClose = useModal().closeModal;
  const changeModal = useModal().setOpenedModal;
  const {user} = useUser();
  const handleClose = () => {
    if (user._id === "" || user.userName === "") {
      changeModal("Auth");
      return;
    }
    onClose();
  };

  return (
    <ModalCover onClose={handleClose} wrapperStyles={(user._id === "" || user.userName === "") && "bg-white"}>
      <div className="p-6">
        <h3 className="text-center font-bold mb-2">
          Правила перебування у чаті Базікало
        </h3>
        <ul className="list-disc text-xs">
          <li className="mb-1">
            <h4 className="font-bold">Етичне спілкування</h4>
            <p>
              Під час використання чату Базікало важливо проявляти повагу та
              доброзичливість до інших користувачів. Ми наполегливо просимо
              утримуватись від образ, загроз, нав'язування, дискримінації або
              будь-якої іншої неприпустимої поведінки.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Конфіденційність та приватність</h4>
            <p>
              {" "}
              Ми цінуємо конфіденційність всіх користувачів. Будь ласка, не
              розголошуйте особисту інформацію інших користувачів без їхньої
              згоди, включаючи їхнє справжнє ім'я, адреси, номери телефонів,
              електронні адреси та інші особисті дані.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Заборона спаму та небажаної реклами</h4>
            <p>
              Ми наполегливо просимо вас не використовувати наш додаток для
              масової розсилки спаму або розміщення небажаної реклами. Будь
              ласка, не розміщуйте посилання на шкідливі або непридатні
              веб-сайти.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Заборона незаконних дій</h4>
            <p>
              Забороняється використання нашого додатку для здійснення
              незаконних дій. Будь ласка, не поширюйте незаконний контент, не
              порушуйте авторські права та не здійснюйте інші протиправні дії.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Модерація</h4>
            <p>
              Наш додаток може бути модерованим, і наша команда має право
              видаляти або блокувати повідомлення та облікові записи, що
              порушують наші правила користування.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Заборона зловживання</h4>
            <p>
              Забороняється зловживання нашим додатком, включаючи масові запити
              або намагання навмисно перевантажити сервери. Будь ласка,
              використовуйте додаток згідно його призначення та не заважайте
              іншим користувачам.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Особиста відповідальність</h4>
            <p>
              Ви несете особисту відповідальність за свої дії під час
              використання нашого додатку чату. Будь ласка, дотримуйтесь законів
              та правил користування. Ви повністю несете відповідальність за
              контент, який розміщуєте, та його наслідки.
            </p>
          </li>
          <li className="mb-1">
            <h4 className="font-bold">Оновлення правил</h4>
            <p>
              Ми залишаємо за собою право вносити зміни до правил користування.
              Рекомендуємо вам періодично ознайомлюватись з актуальними
              правилами та дотримуватись їх.
            </p>
          </li>
        </ul>
      </div>
    </ModalCover>
  );
};

RulesModal.propTypes = {
  onClose: PropTypes.func,
  changeModal: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }),
};
