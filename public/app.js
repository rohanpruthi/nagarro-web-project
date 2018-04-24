//ROHAN PRUTHI
const vm = new Vue({
    el: '#app',
    data: function () {
        return {
            products: [],
            productName: '',
            productPrice: null,
            productVendorId: null,
            vendors: [],
            // vendorName: '',
            cart: [],
            // cartProductId: 0,
            cartPrice: '',
            cartQuantity: '',
            seenAlert1: false,
            seenAlert2: false,
            loggedIn: false,
            user: [],
            currentUsername: '',
        }
    },
    computed: {
        amount: function () {
            return parseInt(this.cartQuantity) * parseFloat(this.cartPrice)
        },
        total: function () { }
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
        //methods for products
        getAllProducts() {
            axios.get('http://localhost:7000/api/products')
                .then(res => {
                    this.products = res.data
                })
                .catch(e => { console.log(e) })
        },
        getProductsByVendor(e) {
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
        //methods for cart
        getCart() {
            axios.get('http://localhost:7000/api/cart')
                .then(res => {
                    this.cart = res.data
                })
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
            let sign = -1
            axios.put('http://localhost:7000/api/cart', { id: cartId, sign })
            axios.get('http://localhost:7000/api/cart')
                .then(res => {
                    this.cart = res.data
                })
        },

        updateCartIncrement(e) {
            let cartId = e.target.id
            let sign = 1
            axios.put('http://localhost:7000/api/cart', { id: cartId, sign })
            axios.get('http://localhost:7000/api/cart')
                .then(res => {
                    this.cart = res.data
                })

        },
        //user menthods
        logIn() {
            console.log("login method")
            axios.post('http://localhost:7000/api/users/login')
            axios.get('http://localhost:7000/api/users')
                .then(res => {
                    this.currentUsername = res.data
                })
            this.loggedIn = true

            // console.log(this.currentUsername)

        },

        signUp() {
            console.log("sign up method")
            axios.post('http://localhost:7000/api/users/signup')
            // .then(res=>{
            //     this.user=res.data
            // })
        },
        //miscellaneous 
        setSeenAlert1() {
            this.seenAlert1 = false
        },
        setSeenAlert2() {
            this.seenAlert2 = false
        }

    }

})