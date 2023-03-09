import { Card, CardContent, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import axios from 'axios'
import React from 'react'

function ProductRegister(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState(props.produto ? "Produto foi editado!" : "Produto foi cadastrado!")

    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [category, setCategory] = React.useState("")
   

    function registerProduct() {
        const method = props.produto ? "put" : "post"
        axios[method]("http://localhost:4000/produto", {
            "id": props.produto ? props.produto.id : undefined,
            "nome": name,
            "descricao": description,
            "categoria": category
        }).then(r => {
            alert(message)
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 3000)
        })
    }

    React.useEffect(() => {
        if (props.produto) {
            setName(props.produto.nome)
            setDescription(props.produto.descricao)
            setCategory(props.produto.categoria)
        }
    }, [props.produto])

    return (
        <Card>
            <CardContent>
                <div style={{ fontSize: '16px' }}>{props.texto}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <TextField value={name} onChange={(e) => { setName(e.target.value) }} fullWidth id="outlined-basic" label="Nome" variant="outlined" />
                    </div>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <TextField value={description} onChange={(e) => { setDescription(e.target.value) }} fullWidth id="outlined-basic" label="Descrição" variant="outlined" />
                    </div>
                    <div style={{ width: '60%', marginTop: '14px' }}>
                        <TextField value={category} onChange={(e) => { setCategory(e.target.value) }} fullWidth id="outlined-basic" label="Categoria" variant="outlined" />
                    </div>

                    <div style={{ width: '60%', display: 'flex', marginTop: '14px', justifyContent: 'right' }}>
                        <Button variant="contained" onClick={() => { registerProduct() }}>
                            {props.produto ? "Editar" : "Salvar"}
                        </Button>
                    </div>

                </div>

            </CardContent>
        </Card>

    )
}

export default ProductRegister