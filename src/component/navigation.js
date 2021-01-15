import React from 'react'
import {connect} from 'react-redux'

import { Navbar } from 'react-bootstrap'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Brand href="#home">Inventory</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        dalam gudang: {this.props.product.length}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps)(Navigation)