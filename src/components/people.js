import React from "react";
import { Table, TableBody, TableCell, TableRow } from '@mui/material'

class People extends React.Component {
    render() {
        const { name, job, image } = this.props
        return (
            <Table>
                <TableBody>
                    <TableRow> {/* 각 사람의 정보를 테이블 행으로 감싸기 위해 TableRow 사용 */}
                        <TableCell>{name}</TableCell>
                        <TableCell>{job}</TableCell>
                        <TableCell><img src={image} alt="" /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default People