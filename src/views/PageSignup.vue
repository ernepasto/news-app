<template>
    <div id="PageLogin">
        <div class="row">
            <div class="column">
                <h1>Crea il tuo account</h1>
                <p>
                    Inserisci i dati necessari per creare il tuo account personale.
                    In questo modo potrai accedere gratuitamente ai servizi offerti.
                </p>
            </div> <!-- /.column -->
            <div class="column">
                <div class="signup-form">
                    <div class="label-group">
                        <label for="name">Nome:</label>
                        <input v-on:keyup.enter="signup" v-model="user.name" type="text" id="name" placeholder="John" autocomplete="off">
                    </div> <!-- /.label-group -->
                    <div class="label-group">
                        <label for="surname">Cognome:</label>
                        <input v-on:keyup.enter="signup" v-model="user.surname" type="text" id="surname" placeholder="Doe" autocomplete="off">
                    </div> <!-- /.label-group -->
                    <div class="label-group">
                        <label for="email">Email:</label>
                        <input v-on:keyup.enter="signup" v-model="user.email" type="email" id="email" placeholder="info@example.com" autocomplete="off">
                    </div> <!-- /.label-group -->
                    <div class="label-group">
                        <label for="password">Password:</label>
                        <input v-on:keyup.enter="signup" v-model="user.password" type="password" id="password" placeholder="A secret word">
                    </div> <!-- /.label-group -->
                    <div v-on:click="signup" class="signup-btn">Sign up</div>                  
                </div> <!-- /.login-form -->
            </div> <!-- /.column -->
        </div> <!-- /.grid-wrapper -->
    </div>
</template>

<script>
export default {
    name: 'PageLogin',
    data() {
        return {
            user: {
                name: null,
                surname: null,
                email: null,
                password: null
            }
        }
    },
    methods: {
        signup: function() {
            if (this.user.name !== null) this.user.name = this.user.name[0].toUpperCase() + this.user.name.slice(1, this.user.name.length);
            if (this.user.surname !== null) this.user.surname = this.user.surname[0].toUpperCase() + this.user.surname.slice(1, this.user.surname.length);
            
            this.$store.dispatch('signup', JSON.stringify(this.user));
        },
        onLoad: function() {
            this.auth = fetch('http://localhost:8083/api/users/checkAuth', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(async data => {
                return { data: await data.json(), status: data.status };
            })
            .then(response => {
                if (response.status === 200 && response.data.auth === true) {
                    this.$toast.success('Already logged in, press log out');
                    this.$router.replace({ name: 'PageNews' });
                }
            })
            .catch(error => console.error(error))
        }
    },
    async created() {
        await this.onLoad();
    }
}
</script>

<style lang="scss" scoped>

$colorRed: #e16259;
$colorRedDark: #cf5951;

.row {
    min-height: 100vh;
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 60px;
    margin: 0 auto;
    padding: 100px 15px;
    @media screen and (max-width: 900px) {
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .column {
            &:first-child {
                text-align: center;
                h1 {
                    font-size: 3em;
                }
                p {
                    max-width: 350px;
                    margin: auto;
                }
            }
        }
    }
    .column {
        h1 {
            margin: 0 0 .25em 0;
            color: #222;
            font-size: 3.5em;
            font-weight: 800;
            line-height: 120%;
        }
        p {
            color: #666;
            line-height: 155%;
        }
        .signup-form {
            .label-group {
                display: block;
                margin: 0 0 1.2em 0;
                label {
                    display: block;
                    margin: 0 0 .25em 0;
                }
                input {
                    width: 325px;
                    padding: 1.1em;
                    border: none;
                    border-radius: 4px;
                    outline: none;
                    background: #f9f9f9;
                    color: #222;
                    font-family: 'Inter', sans-serif;
                    font-size: .95em;
                    &::placeholder {
                        color: #777;
                        font-size: .925em;
                    }
                }
            }
            .signup-btn {
                cursor: pointer;
                display: inline-block;
                padding: .9em 1.8em;
                border-radius: 4px;
                background: $colorRed;
                color: #fff;
                font-size: .9em;
                &:hover {
                    background: $colorRedDark;
                }
            }
        }
    }
}

</style>