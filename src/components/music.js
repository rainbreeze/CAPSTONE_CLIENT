import React from "react";
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

class Music extends React.Component {
    render() {
        const { title, artist, album, image, price, onDelete, id } = this.props;
        return (
            <Table>
                <TableBody>
                    <TableRow> {/* 각 음악 정보를 테이블 행으로 감싸기 위해 TableRow 사용 */}
                        <TableCell>{title}</TableCell>
                        <TableCell>{artist}</TableCell>
                        <TableCell>{album}</TableCell>
                        <TableCell><img src={image} alt="Music Album" style={{ width: 100, height: 100 }} /></TableCell>
                        <TableCell>{price}</TableCell>
                        <TableCell>
                            <button onClick={() => onDelete(id)}>삭제</button> {/* 음악 삭제 버튼 */}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default Music;
