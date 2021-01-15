import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'

import { getProduct } from '../action'

import { Table, Button, Form, Modal } from 'react-bootstrap'


class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errAdd: false,
            selectedIndex: null,
            newQuantity: 0,
            confDelete: false
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then((res) => {
                console.log(res.data)
                this.props.getProduct(res.data)
            })
            .catch((err) => console.log(err))
    }

    renderTHead = () => {
        return (
            <tr>
                <th>#</th>
                <th>Tanggal</th>
                <th>Nama Produk</th>
                <th>SN</th>
                <th>Stock</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>action</th>
            </tr>
        )
    }

    renderTBody = () => {
        return (
            <tbody>
                {this.props.product.map((item, index) => {
                    if (this.state.selectedIndex === index) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.date}</td>
                                <td>
                                    <Form.Control type="text" placeholder="nama produk" ref='namaproduk' />
                                </td>
                                <td>{item.serial}</td>
                                <td>
                                    <Form.Control type="number" placeholder="stock" ref='stock' value={this.state.newQuantity} onChange={(e) => this.changeQty(e)} />
                                </td>
                                <td>
                                    <Form inline>
                                        <Form.Control
                                            as="select"
                                            className="my-1 mr-sm-2"
                                            id="inlineFormCustomSelectPref"
                                            ref='kategori'
                                            custom
                                        >
                                            <option value="0">Choose...</option>
                                            <option value="Electronic">Electronic</option>
                                            <option value="Handphone">Handphone</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Beauty">Beauty</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Food & Drink">Food & Drink</option>
                                        </Form.Control>
                                    </Form>
                                </td>
                                <td>
                                    <Form.Control type="number" placeholder="harga" ref='harga' />
                                </td>
                                <td>
                                    <Button variant="success" onClick={() => this.handleDone(index)}>Done</Button>
                                    <Button variant="danger" onClick={() => this.setState({ selectedIndex: null})}>Cancel</Button>
                                </td>
                            </tr>
                        )
                    }
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.date}</td>
                            <td>{item.name}</td>
                            <td>{item.serial}</td>
                            <td>{item.stock}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>
                                <Button variant="primary" onClick={() => this.setState({ selectedIndex: index, newQuantity: item.quantity })}>edit</Button>
                                <Button variant="danger" onClick={() => this.handleDelete(index)}>delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    tableInput = () => {
        return (
            <tbody>
                <tr>
                    <td>#</td>
                    <td>
                        <input type='date' ref='tanggal' />
                    </td>
                    <td>
                        <Form.Control type="text" placeholder="nama produk" ref='namaproduk' />
                    </td>
                    <td>

                    </td>
                    <td>
                        <Form.Control type="number" placeholder="stock" ref='stock' />
                    </td>
                    <td>
                        <Form inline>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormCustomSelectPref"
                                ref='kategori'
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Handphone">Handphone</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Food & Drink">Food & Drink</option>
                            </Form.Control>
                        </Form>
                    </td>
                    <td>
                        <Form.Control type="number" placeholder="harga" ref='harga' />
                    </td>
                    <td>
                        <Button onClick={this.btnAdd} >Add</Button>
                    </td>
                </tr>
            </tbody>
        )
    }

    btnAdd = () => {
        let tanggal = this.refs.tanggal.value
        let namaProduk = this.refs.namaproduk.value
        let stock = this.refs.stock.value
        let kategori = this.refs.kategori.value
        let harga = this.refs.harga.value
        let status = 'available'

        if (!tanggal || !namaProduk || !stock || !kategori || !harga) return this.setState({ errAdd: true })

        let product = {
            date: new Date(tanggal).toLocaleString(),
            name: namaProduk,
            serial: Date.parse(tanggal),
            stock: stock,
            category: kategori,
            price: harga,
            status: status
        }

        Axios.post('http://localhost:2000/products', product)
            .then((res) => {
                console.log(res.data)

                Axios.get('http://localhost:2000/products')
                    .then((res) => {
                        this.props.getProduct(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    changeQty = (e) => {
        this.setState({ newQuantity: e.target.value })
    }

    handleDone = (index) => {
        let editProduct = this.props.product[index]
        editProduct.name = this.refs.namaproduk.value
        editProduct.stock = this.refs.stock.value
        editProduct.category = this.refs.kategori.value
        editProduct.price = this.refs.harga.value

        console.log(editProduct)

        let tempProduct = this.props.product
        tempProduct.splice(index, 1, editProduct)
        console.log(tempProduct)

        Axios.patch('http://localhost:2000/products', { 
            name: editProduct.name,
            stock : editProduct.stock,
            category : editProduct.category,
            price : editProduct.price })

                .then((res) => {
                
                    Axios.get('http://localhost:2000/products')
                        .then((res) => {
                            this.props.getProduct(res.data)
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
    }

    handleDelete = (index) => {
        let editProduct = this.props.product[index]
        editProduct.status = 'non-available'

        let tempProduct = this.props.product
        console.log(tempProduct)
        tempProduct.splice(index, 1, editProduct)

        Axios.patch('http://localhost:2000/products', { status : editProduct })
            .then((res) => {
                console.log(res.data)

                Axios.get('http://localhost:2000/products')
                    .then((res) => {
                        this.props.getProduct(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    render() {
        console.log(this.props.product)
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        {this.renderTHead()}
                    </thead>
                    {this.renderTBody()}
                    {this.tableInput()}
                </Table>



                <Modal show={this.state.errAdd} onHide={() => this.setState({ errAdd: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Isi semua data dengan lengkap </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ errAdd: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.confDelete} onHide={() => this.setState({ confDelete: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control ref='pass' type='password' placeholder='masukan password anda'/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({confDelete: false})}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.confDelete}>
                            Confirmm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps, { getProduct })(Products)