import { observer } from 'mobx-react-lite';
import Router from './navigation/Router';
import UserStore from './viewmodels/User/UserStore';
const userStore = UserStore.getUserStore()

function App() {
 

  return (
    <div className="App">
        <Router/>
    </div>
  );
}

export default observer(App);
