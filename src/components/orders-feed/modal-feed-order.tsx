import Modal from '../modal/modal';
import { useSelector } from '../../types/hooks';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { FeedOrderDetails } from './feed-orders-detalis/feed-order-details';
import { TOrders } from '../../types/data';

export const ModalOrderFeed: React.FC = () => {
  const history = useHistory<History>();
  const { id } = useParams<{ id: string }>();
    const message = useSelector(store => store.orders.messages);
    const orders = message!.orders
    const currentOrder = orders!.find((x: TOrders) => x.number === parseInt(id));

  const handleClick = () => {
    history.goBack();
  };
  return (
    <Modal
      isOpen={true}
      title={`#${currentOrder!.number}`}
      onClick={handleClick}
      onCloseClick={handleClick}
    >
      <FeedOrderDetails/>
    </Modal>
  );
}