import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

class Car extends React.Component {
    render() {
        const { make, model, price, image, year, id, onDelete } = this.props;
        return (
            <TableRow>
                <TableCell>{make}</TableCell>
                <TableCell>{model}</TableCell>
                <TableCell>{year}</TableCell>
                <TableCell><img src={image} alt="" width="50" height="50" /></TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>
                    <Button onClick={() => onDelete(id)} color="error">삭제</Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default Car;
