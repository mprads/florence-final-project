import React, {Component} from 'react';
import { Link } from 'react-router';

import Login from './login.component.jsx'

class Main extends Component {
render(){
  return(
  <section className="hero is-light is-fullheight">

  <div className="hero-body">
    <div className="container has-text-centered">
      <div>
	    <div className="columns">
	      <div className="column is-one-third">
	      </div>

	      <div className="column">
	      <h1 className="title">
            Florence
          </h1>
          <h3 className="subtitle animated fadeInUp">
            Your Hospice Assistant
          </h3>
	      </div>

	      <div className="column">
	      </div>
	    </div>

	  <Login />

		<a className="button is-large">
    	  <Link to="/nurse" activeClassName="active">Nurses</Link>
		</a>
		<a className="button is-large">
	  	  <Link to="/bed" activeClassName="active">Beds</Link>
	  	</a>


	</div>

    </div>
  </div>

</section>


  );
}
}

export default Main