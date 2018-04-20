//ROHAN PRUTHI
const vm = new Vue({
    el: '#app',
    data: function () {
        return {
            products: [
                {
                    name: 'Pixel 2 XL',
                    vendorId: '1',
                    price: 50000

                }
            ],
            productName: '',
            productPrice: null,
            productVendorId: 0, //()=>getAllVendors()
            vendors: [
                {
                    name: 'Google',
                    id: 1
                }
            ],
            vendorName: '',
            cart: [
                {
                    productId: 1,
                    productName: 'Pixel 2 XL',
                    quantity: 1,
                    // price: products[productId].price
                }
            ],
            cartProductId: 0,
            cartProductName: '',
            cartQuantity: 0,
            seenAlert1: false,
            seenAlert2: false
        }
    },
    mounted() {
        axios.get('http://localhost:7000/api/products')
            .then(res => {
                this.products = res.data
            })
            .catch(e => { console.log(e) })
        axios.get('http://localhost:7000/api/vendors')
            .then(res => {
                this.vendors = res.data
            })
            .catch(e => { console.log(e) })
        axios.get('http://localhost:7000/api/cart')
            .then(res => {
                this.cart = res.data
            })
            .catch(e => { console.log(e) })

    },
    methods: {
        getAllProducts() {
            axios.get('http://localhost:7000/api/products')
                .then(res => {
                    this.products = res.data
                })
                .catch(e => { console.log(e) })
        },
        getProductsByVendor(e) {
            // console.log(e.target.id)
            let id = e.target.id
            axios.get('http://localhost:7000/api/products/' + id)
                .then(res => {
                    this.products = res.data
                })
                .catch(e => { console.log(e) })
        },
        addProduct() {
            if (!(this.productName == '') || (this.productPrice == -1) || this.productVendorId == 0) {
                axios.post('http://localhost:7000/api/products', {
                    name: this.productName,
                    price: this.productPrice,
                    vendorId: this.productVendorId
                })
                    .then(res => {
                        this.products = res.data
                        this.seenAlert1 = true
                    })
                    .catch(e => { console.log(e) })
                axios.get('http://localhost:7000/api/products')
                    .then(res => {
                        this.products = res.data
                    })
                    .catch(e => { console.log(e) })
            }
        },
        addToCart(e) {
            let id = e.target.id
            axios.post('http://localhost:7000/api/cart/', { productId: id })

            axios.get('http://localhost:7000/api/cart')
                .then(res => {
                    this.cart = res.data
                })
            this.seenAlert2 = true
        },
        updateCartDecrement(e) {
            let cartId = e.target.id
            console.log("asasa",cartId)
            for (let i = 0; i < this.cart.length; i++) {

                if (this.cart[i].id == cartId) {
                    if (this.cart[i].quantity   == 1) {
                        axios.delete('http://localhost:7000/api/cart/' + cart[i].id)
                        axios.get('http://localhost:7000/api/cart')
                            .then(res => {
                                this.cart = res.data
                            })
                        break;    
                    }
                    
                    else {
                        s = -1
                        console.log(s)
                        axios.put('http://localhost:7000/api/cart', { id: this.cart[i].id, s })
                        axios.get('http://localhost:7000/api/cart')
                            .then(res => {
                                this.cart = res.data
                            })
                        break;    
                    }
                }
            }

        },

        updateCartIncrement(e) {
            let cartId = e.target.id
            console.log("saasa",cartId)
            // for (let i = 0; i < this.cart.length; i++) {
            //     if(this.cart[i].id===cartId)
                s = 1
                axios.put('http://localhost:7000/api/cart', { id: cartId, s })
                axios.get('http://localhost:7000/api/cart')
                    .then(res => {
                        this.cart = res.data
                    })

            }
        },    

    setSeenAlert1() {
        this.seenAlert1 = false
    },
    setSeenAlert2() {
        this.seenAlert2 = false
    }

})