Vue.component('cart', {
    data(){
        return {
            cartUrl: `/getBasket.json`,
            showCart: false,
            cartItems: [],
            imgCart: `https://placehold.it/50x100`
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        console.log('error');
                    }
                })
        },
        remove(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    } else {
                        console.log('error');
                    }
                })
        },
    },
    computed: {
        totalCost(){
            return this.cartItems.reduce((accum, item) => accum += item.price * item.quantity, 0);
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el)
                }
            });
    },
    template: `<div class="cart">
                    <button class="btn-cart" type="button" @click='showCart = !showCart'>Корзина</button>
                    <div class="div-cart" v-show="showCart">
                    <p v-if="!cartItems.length" class="no-goods">Корзина пуста</p>
                    <div v-else="">
                        <cart-item 
                        v-for="item of cartItems" 
                        :key="item.id_product"
                        :cart-item="item"
                        :img="imgCart"
                        @remove="remove"></cart-item>
                        <span class="cart-total">Итого:{{totalCost}}</span>
                        <button class="btn-cart btn-clear" @click="cartItems = []">Очистить</button>
                    </div>
            </div>
</div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                        <div class="cart-item-title">{{cartItem.product_name}}</div>
                        <div class="cart-item-count">
                            <button class="btn-change-count" @click="$emit('remove', cartItem)">-</button>
                            <span class="cart-item-count-span">{{cartItem.quantity}}</span>
                            <button class="btn-change-count" @click="cartItem.quantity++">+</button>
                        </div>
                        <div class="cart-item-cost">{{cartItem.quantity * cartItem.price}}</div>
                    </div>`
        });