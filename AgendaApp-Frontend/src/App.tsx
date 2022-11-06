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
import { MyImages } from './pages/MyImages';
import { EditMyImages } from './pages/EditMyImages';
import { AddMyImages } from './pages/AddMyImages';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/add" component={AddToDo}/>
                <Route path="/edit/:id" component={EditToDo}/>
                <Route path="/myimages" exact component={MyImages}/>
                <Route path="/addimage" exact component={AddMyImages}/>
                <Route path="/editimage/:id" exact component={EditMyImages}/>
                <Redirect exact from="/" to="/login" />
            </IonRouterOutlet>
        </IonReactRouter>
  </IonApp>
);

export default App;
