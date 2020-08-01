import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => val && (val.length>=len);

    function RenderComments({comments,addComment,dishId}){
        return (
            <div>{
            comments.map((cmnt)=>{
            return (
                <div key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>-- {cmnt.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}</p>
                </div>
            );
        })}
        <CommentForm dishId={dishId} addComment={addComment}/>
        </div>)

    }
    function RenderDish({dish}){
        console.log(dish)
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" object src={baseUrl+ dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId,values.rating,values.name,values.message);
            //console.log("Current state is: "+JSON.stringify(values))
            //alert("Current state is: "+JSON.stringify(values))
        }        
        render(){
            return (
                <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"> Submit Comment</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name" placeholder="Your Name" 
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className="text-danger" model=".name" show="touched" 
                                    messages={{
                                        required: '',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={2}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            );
        }
    }
    const DishDetail = (props) =>{
        if(props.isLoading || props.dish==null ){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                 <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/menu'>Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    {props.dish.name}
                </BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3> {props.dish.name}</h3>
                  <hr/>
              </div>
            </div>
            <div className="row col-md-12">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1 list-unstyled ml-3">
            <h4>Comments</h4>
            <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
            </div>
            </div>
            </div>
        );
    }
        
export default DishDetail;