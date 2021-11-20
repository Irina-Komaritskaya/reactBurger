import Modal from '../modal/modal';
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { FeedOrderDetails } from './feed-orders-detalis/feed-order-details';

export const ModalOrderFeed: React.FC = () => {
  const history = useHistory<History>();
  const { id } = useParams<{ id: string }>();
    const message = useSelector((store: any) => store.orders.messages);
    const orders = message.orders
    const currentOrder = orders.find((x: any) => x.number === parseInt(id));

  const handleClick = () => {
    history.goBack();
  };
  return (
    <Modal
      isOpen={true}
      title={`#${currentOrder.number}`}
      onClick={handleClick}
      onCloseClick={handleClick}
    >
      <FeedOrderDetails isModal={true}/>
    </Modal>
  );
}