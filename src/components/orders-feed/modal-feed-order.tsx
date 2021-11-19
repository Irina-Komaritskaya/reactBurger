import Modal from '../modal/modal';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { FeedOrderDetails } from './feed-orders-detalis/feed-order-details';

export const ModalOrderFeed: React.FC = () => {
  const history = useHistory<History>();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <Modal
      isOpen={true}
      onClick={handleClick}
      onCloseClick={handleClick}
    >
      <FeedOrderDetails />
    </Modal>
  );
}