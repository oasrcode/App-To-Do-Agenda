import { Redirect, Route } from 'react-router-dom';
import { IonApp,IonRouterOutlet,setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Home } from './pages/Home';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { EditToDo } from './pages/EditToDo';
import { AddToDo } from './pages/AddToDo';






setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" exact component={Home}/>
                <Route path="/add" component={AddToDo}/>
                <Route path="/edit/:id" component={EditToDo}/>
            </IonRouterOutlet>
        </IonReactRouter>
  </IonApp>
);

export default App;
