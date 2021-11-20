import { EStatus } from '../types/types';
export const formatStatusOrder = (status: EStatus) => {
  switch (status) {
    case EStatus.Created: {
      return 'Создан';
    }
    case EStatus.Done: {
      return 'Готово';
    }
    case EStatus.Pending: {
      return 'Готовится';
    }
    default: {
      return '';
    }
  }
};
