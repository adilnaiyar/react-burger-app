import React, {Component} from 'react';
import classes from './Modal.css';
import Auxillary from '../../../hoc/Auxillary';
import BackDrop from '../../UI/BackDrop/BackDrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextstate){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return (
            <Auxillary>
                <BackDrop show = {this.props.show} clicked = {this.props.modalClosed}/>
                <div 
                    className = {classes.Modal}
                    style = {{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0' }}>
                    {this.props.children}
                </div>
            </Auxillary>
        );
    };
    
};

export default Modal;