// class MessageModal extends React.Component {}
import React from 'react';

import './MessageModal.css';

class MessageModal extends React.Component{

render(){
    return(
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className="modal-body">
                    <p>
                        {this.props.message}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-continue" onClick={this.props.close}>CONTINUE</button>
                    <br/>
                    <button className="btn-cancel" onClick={this.props.close}>CLOSE</button>
                </div>
            </div>
        </div>
    )
    }
        
}

export default MessageModal;



