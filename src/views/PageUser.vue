<template>
    <div id="PageUser">
       
        <div class="user-form">
            <h1 class="user-form-title">Attuale profilo</h1>
            <div class="user-form-container">
                <div class="label-group">
                    <label for="name">Nome:</label>
                    <input :value="user.name" type="text" id="name" autocomplete="off" disabled>
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="surname">Cognome:</label>
                    <input :value="user.surname" type="text" id="surname" autocomplete="off" disabled>
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="email">Email:</label>
                    <input :value="user.email" type="text" id="email" autocomplete="off" disabled>
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="date">Data iscrizione:</label>
                    <input :value="user.date | formatDate" type="text" id="date" autocomplete="off" disabled>
                </div> <!-- /.label-group -->
                <div v-on:click="refresh" class="refresh-btn">Aggiorna</div>
            </div> <!-- /.user-form -->
        </div> <!-- /.user-form-container -->

        <div class="new-user-form">
            <h1 class="new-user-form-title">Aggiornare il profilo</h1>
                <div class="new-user-form-container">
                    <div class="label-group">
                    <label for="name">Nome:</label>
                    <input v-on:keyup.enter="update" v-model="newUser.name" type="text" id="name" placeholder="John" autocomplete="off">
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="surname">Cognome:</label>
                    <input v-on:keyup.enter="update" v-model="newUser.Cognome" type="text" id="surname" placeholder="Doe" autocomplete="off">
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="email">Email:</label>
                    <input v-on:keyup.enter="update" v-model="newUser.email" type="text" id="email" placeholder="info@example.com" autocomplete="off">
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="newPassword">Nuova password:</label>
                    <input v-on:keyup.enter="update" v-model="newUser.newPassword" type="password" id="newPassword" placeholder="A secret word" autocomplete="off">
                </div> <!-- /.label-group -->
                <div class="label-group">
                    <label for="password">Password attuale (obbligatoria):</label>
                    <input v-on:keyup.enter="update" v-model="newUser.password" type="password" id="password" placeholder="A secret word" autocomplete="off">
                </div> <!-- /.label-group -->
                <div v-on:click="remove" class="delete-btn">Elimina account</div>
                <div v-on:click="update" class="update-btn">Salva</div>
            </div> <!-- /.new-user-form-container -->
        </div> <!-- /.new-user-form -->

    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'PageUser',
    data() {
        return {
            user: {
                name: null,
                surname: null,
                email: null,
                date: null
            },
            newUser: {
                name: null,
                surname: null,
                email: null,
                newPassword: null,
                password: null
            }
        }
    },
    filters: {
        formatDate(date) {
            return moment(String(date)).format('DD MMMM YYYY - h:mm:ss');
        }    
    },
    methods: {
        onLoad: function() {
            this.auth = fetch('http://localhost:8083/api/users/getuser', {
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
                if (response.status === 401) {
                    this.$toast.warning(response.data.message);
                    this.$router.replace({ name: 'PageLogin' });
                } else if (response.status === 400) {
                    this.$toast.error(response.data.message);
                } else {
                    this.user = response.data.message.user;
                }
            })
            .catch(error => console.error(error));
        },
        update: function() {
            if (this.newUser.name !== null)  this.newUser.name = this.newUser.name[0].toUpperCase() + this.newUser.name.slice(1, this.newUser.name.length);
            if (this.newUser.surname !== null) this.newUser.surname = this.newUser.surname[0].toUpperCase() + this.newUser.surname.slice(1, this.newUser.surname.length);

            if (this.newUser.newPassword === null || this.newUser.newPassword === '') this.newUser.newPassword = this.newUser.password;
            if (this.newUser.name === null || this.newUser.name === '') this.newUser.name = this.user.name;
            if (this.newUser.surname === null || this.newUser.surname === '') this.newUser.surname = this.user.surname;
            if (this.newUser.email === null || this.newUser.email === '') this.newUser.email = this.user.email;

            this.$store.dispatch('update', JSON.stringify(this.newUser));

            this.newUser.name = null;
            this.newUser.surname = null;
            this.newUser.email = null;
            this.newUser.newPassword = null;
            this.newUser.password = null;
        },
        remove: function() {
            this.$store.dispatch('delete', this.newUser.password);
        },
        refresh: function() {
            location.reload();
        }
    },
    async created() {
        await this.onLoad();
    },
}
</script>

<style lang="scss" scoped>

$colorRed: #e16259;
$colorRedDark: #cf5951;

.user-form {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 120px 15px 0 15px;
    .user-form-title {
        margin: 0 0 1em 0;
        color: $colorRed;
        font-size: 2.3em;
        font-weight: 800;
        line-height: 120%;
    }
    .user-form-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        @media screen and (max-width: 725px) {
            grid-template-columns: repeat(1, 1fr);
        }
        .label-group {
            display: block;
            margin: 0 0 1.2em 0;
            label {
                display: block;
                margin: 0 0 .25em 0;
            }
            input {
                cursor: not-allowed;
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
        .refresh-btn {
            justify-self: start;
            align-self: center;
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

.new-user-form {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 50px 15px 0 15px;
    .new-user-form-title {
        margin: 0 0 1em 0;
        color: #222;
        font-size: 2.3em;
        font-weight: 800;
        line-height: 120%;
    }
    .new-user-form-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        @media screen and (max-width: 725px) {
            grid-template-columns: repeat(1, 1fr);
        }
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
        .update-btn {
            justify-self: start;
            align-self: center;
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
        .delete-btn {
            justify-self: start;
            align-self: center;
            cursor: pointer;
            display: inline-block;
            padding: .9em 1.8em;
            border-radius: 4px;
            background: #333;
            color: #fff;
            font-size: .9em;
            &:hover {
                background: #000;
            }
            @media screen and (max-width: 725px) {
                margin: 0 0 .5em 0;
            }
        }
    }
}

</style>
