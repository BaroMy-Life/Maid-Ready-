import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminPage from '../AdminPage/AdminPage';
import OwnerRegistration from '../RegisterPage/RegisterOwnerPage';
import KeeperRegistration from '../RegisterPage/RegisterKeeperPage';
import CleaningStandards from '../LandingPage/CleaningStandards';

import OwnersHomePage from '../UserPage/OwnersHomePage/OwnersHomePage';
import OwnerRequestDetails from '../OwnerRequestDetails/OwnerRequestDetails';
import OwnerViewRequestsPage from '../OwnerViewRequestsPage/OwnerViewRequestsPage';
import OwnerActiveRequestsPage from '../OwnerActiveRequestPage/OwnerActiveRequestPage';
import OwnerCompletedRequestsPage from '../OwnerCompletedRequestPage/OwnerCompletedRequestPage';
import PropertiesPage from '../PropertiesPage/PropertiesPage';
import CreateJobForm from '../CreateJobForm/CreateJobForm';
import AddPropertyPage from '../AddPropertyPage/AddPropertyPage';

import KeeperHomePage from '../UserPage/KeeperHomePage/KeeperHomePage';
import JobList from '../JobList/JobList';
import JobDetails from '../JobDetails/JobDetails';
import './App.css';
import LoginSelection from '../LoginSelectionPage/LoginSelectionPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <OwnersHomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin">
            <AdminPage />
          </ProtectedRoute>

          <Route exact path="/CleaningStandards">
            <CleaningStandards />
          </Route>

          <ProtectedRoute exact path="/properties">
            <PropertiesPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/properties/add">
            <AddPropertyPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/keeper/job-list">
            <JobList />
          </ProtectedRoute>

          <ProtectedRoute exact path="/keeper/job/details/:id">
            <JobDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path="/keeper/home">
            <KeeperHomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/jobs/create">
            <CreateJobForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/OwnerViewRequestsPage">
            <OwnerViewRequestsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/OwnerCompletedRequestsPage">
            <OwnerCompletedRequestsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/OwnerActiveRequestsPage">
            <OwnerActiveRequestsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/OwnerRequestDetails">
            <OwnerRequestDetails />
          </ProtectedRoute>

          {/* Login and Register Pages */}

          {/* Login Selection */}
          <Route exact path="/login/selection">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginSelection />
            )}
          </Route>

          {/* login pages */}
          <Route exact path="/login/keeper">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/keeper/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage type="keeper" />
            )}
          </Route>

          <Route exact path="/login/owner">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage type="owner" />
            )}
          </Route>

          {/* registration pages */}
          <Route exact path="/register/keeper">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/keeper/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage type="keeper" />
            )}
          </Route>

          <Route exact path="/register/owner">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage type="owner" />
            )}
          </Route>

          <Route exact path="/OwnerRegistration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page

              <OwnerRegistration type="owner" />
            )}
          </Route>

          <Route exact path="/KeeperRegistration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <KeeperRegistration type="keeper" />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
