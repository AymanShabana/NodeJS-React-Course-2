import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom';

    function RenderComments({comments}){
        return comments.map((cmnt)=>{
            return (
                <div key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>-- {cmnt.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}</p>
                </div>
            );
        });

    }
    function RenderDish({dish}){
        console.log(dish)
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
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
    const DishDetail = (props) =>{
        if(props.dish==null){
            return (<div></div>)
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
            <RenderComments comments={props.comments} />
            </div>
            </div>
            </div>
        );
    }
        
export default DishDetail;