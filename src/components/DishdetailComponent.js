import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props) {
        super(props);
    }
    renderComments(comments){
        return comments.map((cmnt)=>{
            return (
                <div key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>-- {cmnt.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}</p>
                </div>
            );
        });

    }
    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" object src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
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
    render(){
        if(this.props.dish==null){
            return (<div></div>)
        }
        return (
            <div className="container">
            <div className="row col-md-12">
            <div className="col-12 col-md-5 m-1">
                {this.renderDish(this.props.dish)}
            </div>
            <div className="col-12 col-md-5 m-1 list-unstyled ml-3">
            <h4>Comments</h4>
            {this.renderComments(this.props.dish.comments)}
            </div>
            </div>
            </div>
        );
    }
}
export default Dishdetail;