import React from 'react'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@mui/material'


import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function ProductList(props) {

    return (
        <div>
            <h4>{props.texto}</h4>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell >Nome</TableCell>
                            <TableCell >Descrição</TableCell>
                            <TableCell >Categoria</TableCell>
                            <TableCell >Opções </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.produto && props.produto.map((row, index)=>(
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell component="th" scope="row">{row.nome}</TableCell>
                                <TableCell align="right">{row.descricao}</TableCell>
                                <TableCell align="right">{row.categoria}</TableCell>
                                <TableCell>
                                    <EditIcon color='primary' sx={{
                                        '&:hover':{
                                            color:'secondary',
                                            cursor:'pointer'
                                        }
                                    }} onClick={e => props.editarProduto(row)}/>
                                    <DeleteIcon color='error' sx={{
                                        '&:hover':{
                                            color:'secondary',
                                            cursor:'pointer'
                                        }
                                    }} onClick={e => props.deletarProduto(row.id)}/>

                                </TableCell>
                        </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductList