import React, {Component} from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

class Header extends Component {
    render(){
        return (
            <React.Fragment>
                <Navbar dark >
                    <div className="container">
                    <NavbarBrand href="/">East of West Restaurant</NavbarBrand>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>East of West Restaurant</h1>
                                <p>All my homies love East of West.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header