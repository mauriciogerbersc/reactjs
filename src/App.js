import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class App extends Component{
  state = {
    products: [],
    newProductData: {
        description: '',
        code: '',
        short_description: '',
        value: '',
        qty: ''
    },
    newProductModal: false,
    editProductModal: false,
    ViewProductModal: false,
    editProductData: {
      id: '',
      description: '',
      code: '',
      short_description: '',
      value: '',
      qty: '',
      status: ''
    },
    viewProductData: {
      id: '',
      description: '',
      code: '',
      short_description: '',
      value: '',
      qty: '',
      status: ''
    }
  }

  componentWillMount() {
    this._refreshProducts();
  }
  
  toggleNewProductModal() {
    this.setState({
      newProductModal: ! this.state.newProductModal
    })
  }

  toggleEditProductModal() {
    this.setState({
      editProductModal: ! this.state.editProductModal
    })
  }

  toggleViewProductModal() {
    this.setState({
      viewProductModal: ! this.state.viewProductModal
    })
  }

  addProduct(){
    axios.post('http://18.228.14.48/api/products', this.state.newProductData).then((response) => {
      
    let {products} = this.state;

    products.push(response.data);

    this.setState({products, newProductModal:false, newProductData: {
      description: '',
      code: '',
      short_description: '',
      value: '',
      qty: ''
      }});
    });
  }
  
  deleteProduct(id){
    axios.delete('http://18.228.14.48/api/products/' + id)
    .then((response) => {
      console.log(response);
      this._refreshProducts();
    });
  }

  updateProduct(){

    let { description, code, short_description, value, qty, status} = this.state.editProductData;

    axios.put('http://18.228.14.48/api/products/' + this.state.editProductData.id, {
      description, code, short_description, value, qty, status
    }).then((response) => {
      this._refreshProducts();
      this.setState({
        editProductModal: false, editProductData: {
          id: '',
          description: '',
          code: '',
          short_description: '',
          value: '',
          qty: '',
          status: ''
        }
      })
      //console.log(response.data);
    });
  }

  editProduct(id,description,code,short_description,value,qty, status){
    this.setState({
      editProductData: {id,description,code,short_description,value,qty,status}, editProductModal: ! this.state.editProductModal
    })
  }

  viewProduct(id,description,code,short_description,value,qty, status){
    this.setState({
      viewProductData: {id,description,code,short_description,value,qty,status}, viewProductModal: ! this.state.viewProductModal
    })
  }

 _refreshProducts(){
  axios.get('http://18.228.14.48/api/products?cmd=list').then((response) => {
    this.setState({
      products: response.data
    })
  });
 }


  render() {

    let products = this.state.products.map((product) => {
      return (
        <tr key={product.id}>
       
          <td>{product.code}</td>
          <td>{product.short_description}</td>
          <td>{product.value}</td>
          <td>{product.qty}</td>
          <td>{product.status}</td>
          <td>
            <Button color="warning"
            size="sm" 
            className="mr-2" 
            onClick={this.viewProduct.bind(this, 
            product.id, 
            product.description, 
            product.code, 
            product.short_description, 
            product.value, 
            product.qty, 
            product.status )}>
              Visualizar Produto
            </Button>
            <Button color="success" 
            size="sm" 
            className="mr-2" 
            onClick={this.editProduct.bind(this, 
            product.id, 
            product.description, 
            product.code, 
            product.short_description, 
            product.value, 
            product.qty, 
            product.status )}>
              Editar</Button>
            <Button color="danger" size="sm" onClick={this.deleteProduct.bind(this, product.id)}>Excluir</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">
      <h1>Produtos</h1>
      <Button className="my-3" color="primary" onClick={this.toggleNewProductModal.bind(this)}>Adicionar Produto</Button>
        
       
      <Modal isOpen={this.state.newProductModal} toggle={this.toggleNewProductModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewProductModal.bind(this)}>Adicionando novo produto</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="description">Descrição</Label>
              <Input id="description" value={this.state.newProductData.description} onChange={(e) => {
                let { newProductData } = this.state;
                newProductData.description = e.target.value;
                this.setState({newProductData})
              }}
              placeholder="Descrição  do produto" />
            </FormGroup>
            <FormGroup>
              <Label for="code">Código</Label>
              <Input id="code" value={this.state.newProductData.code} onChange={(e) => {
                let { newProductData } = this.state;
                newProductData.code = e.target.value;
                this.setState({newProductData})
              }}
              placeholder="Código do produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="short_description">Descrição resumida</Label>
              <Input id="short_description" value={this.state.newProductData.short_description} onChange={(e) => {
                let { newProductData } = this.state;
                newProductData.short_description = e.target.value;
                this.setState({newProductData})
              }}
              placeholder="Resumo do produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="value">Valor</Label>
              <Input id="value" value={this.state.newProductData.value} onChange={(e) => {
                let { newProductData } = this.state;
                newProductData.value = e.target.value;
                this.setState({newProductData})
              }} placeholder="Valor do produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="qty">Quantidade</Label>
              <Input id="qty" value={this.state.newProductData.qty} onChange={(e) => {
                let { newProductData } = this.state;
                newProductData.qty = e.target.value;
                this.setState({newProductData})
              }} placeholder="Quantidade produto" />
            </FormGroup>  
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addProduct.bind(this)}>Adicionar</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewProductModal.bind(this)}>Cancelar</Button>
          </ModalFooter>
      </Modal>
     
     
      <Modal isOpen={this.state.editProductModal} toggle={this.toggleEditProductModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditProductModal.bind(this)}>Editando Produto</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="description">Descrição</Label>
              <Input id="description" value={this.state.editProductData.description} onChange={(e) => {
                let { editProductData } = this.state;
                editProductData.description = e.target.value;
                this.setState({editProductData})
              }}
              placeholder="Descrição  do produto" />
            </FormGroup>
            <FormGroup>
              <Label for="code">Código</Label>
              <Input id="code" value={this.state.editProductData.code} onChange={(e) => {
                let { editProductData } = this.state;
                editProductData.code = e.target.value;
                this.setState({editProductData})
              }}
              placeholder="Código do produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="short_description">Descrição resumida</Label>
              <Input id="short_description" value={this.state.editProductData.short_description} onChange={(e) => {
                let { editProductData } = this.state;
                editProductData.short_description = e.target.value;
                this.setState({editProductData})
              }}
              placeholder="Resumo do produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="value">Valor</Label>
              <Input id="value" value={this.state.editProductData.value} onChange={(e) => {
                let { editProductData } = this.state;
                editProductData.value = e.target.value;
                this.setState({editProductData})
              }} placeholder="Valor do produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="qty">Quantidade</Label>
              <Input id="qty" value={this.state.editProductData.qty} onChange={(e) => {
                let { editProductData } = this.state;
                editProductData.qty = e.target.value;
                this.setState({editProductData})
              }} placeholder="Quantidade produto" />
            </FormGroup>  
            <FormGroup>
              <Label for="status">Status</Label>
              <Input type="select" id="status" value={this.state.editProductData.status} onChange={(e) => {
                let { editProductData } = this.state;
                editProductData.status = e.target.value;
                this.setState({editProductData})
              }}>
                <option value="disable">Desabilitar</option>
                <option value="enable">Habilitar</option>
              </Input>
            </FormGroup> 
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateProduct.bind(this)}>Salvar</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditProductModal.bind(this)}>Cancelar</Button>
          </ModalFooter>
      </Modal>
      

      <Modal isOpen={this.state.viewProductModal} toggle={this.toggleViewProductModal.bind(this)}>
          <ModalHeader toggle={this.toggleViewProductModal.bind(this)}>{this.state.viewProductData.short_description}</ModalHeader>
          <ModalBody> 
          <Form>
            <FormGroup>
              <Label for="description">Descrição</Label>
              <p><strong>{this.state.viewProductData.description}</strong></p>
            </FormGroup>
            <FormGroup>
              <Label for="code">Código</Label>
              <p><strong>{this.state.viewProductData.code}</strong></p>
            </FormGroup>  
            <FormGroup>
              <Label for="short_description">Descrição resumida</Label>
              <p><strong>{this.state.viewProductData.short_description}</strong></p>
            </FormGroup>  
            <FormGroup>
              <Label for="value">Valor</Label>
              <p><strong>{this.state.viewProductData.value}</strong></p>
            </FormGroup>  
            <FormGroup>
              <Label for="qty">Quantidade</Label>
              <p><strong>{this.state.viewProductData.qty}</strong></p>
            </FormGroup>  
            <FormGroup>
              <Label for="status">Status</Label>
              <p><strong>{this.state.viewProductData.status}</strong></p>
            </FormGroup> 
          </Form>
         </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleViewProductModal.bind(this)}>Fechar</Button>
          </ModalFooter>
      </Modal>
      

        <Table>
          <thead>
              <tr>
                <th>cod</th>
                <th>descrição</th>
                <th>valor</th>
                <th>quantidade</th>
                <th>status</th>
                <th>ações</th>
              </tr>
          </thead>
          <tbody>
           {products}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
