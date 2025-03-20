import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function Music({ id, title, artist, album, image, price, onDelete }) {
    return (
        <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>{artist}</TableCell>
            <TableCell>{album}</TableCell>
            <TableCell><img src={image} alt={title} style={{ width: '100px' }} /></TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
                <Button onClick={() => onDelete(id)}>삭제</Button>
            </TableCell>
        </TableRow>
    );
}

export default Music;
