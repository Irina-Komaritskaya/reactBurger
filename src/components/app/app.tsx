import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import Main from '../../pages/main/main-page';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

  function App() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={style.app}>
          <AppHeader />
          <Main/>
        </div>
      </DndProvider>
    );
}
export default App;
