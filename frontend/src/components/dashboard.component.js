import React from "react";
import background from '../photos/filled_star.png';
class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12 col-md-6" style={{backgroundColor: `url(${background})`}}>
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;