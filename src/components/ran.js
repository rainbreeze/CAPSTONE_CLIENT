import React from "react";

class Ran extends React.Component {
    render() {
        const { name, age, id } = this.props
        return (
            <div>
                <p>{name}</p>
                <p>{age}</p>
                <p>{id}</p>
            </div>
        );
    }
}

export default Ran;