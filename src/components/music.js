import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function Music({ id, title, artist, album, image, price, onDelete }) {
    return (
        <TableRow>
            <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}>{title}</TableCell>
            <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}>{artist}</TableCell>
            <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}>{album}</TableCell>
            <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}>
                <img src={image} alt={title} style={{ width: '100px' }} />
            </TableCell>
            <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}>{price}</TableCell>
            <TableCell sx={{ fontFamily: 'Jua, sans-serif' }}>
                <Button onClick={() => onDelete(id)}>삭제</Button>
            </TableCell>
        </TableRow>
    );
}

export default Music;
