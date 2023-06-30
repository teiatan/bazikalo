import PropTypes from 'prop-types';
import { ModalCover } from "./ModalCover";

export const RulesModal = ({onClose, changeModal, user}) => {

    const handleClose = () => {
        if(user.id === '' || user.userName === '') {
            changeModal('Auth');
            return;
        };
        onClose();
    };

    return(
        <ModalCover onClose={handleClose}>
            <div>RulesModal</div>
        </ModalCover>
    )
};

RulesModal.propTypes = {
    onClose: PropTypes.func,
    changeModal: PropTypes.func,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
    }),
};