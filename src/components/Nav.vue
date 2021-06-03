<template>
    <div v-bind:class="{ isScrolled: isScrolled, isSmall: isSmall }" class="nav">
        <div class="nav-container">
            <ul v-if="curretPage === 'PageSignup'" v-bind:class="{ isVisible: isVisible }" class="nav-items">
                <router-link :to="{ name: 'PageHome'}" class="nav-link">
                    <li role="link">Home.</li>
                </router-link>
                <div class="nav-user-links">
                    <router-link :to="{ name: 'PageUser'}" class="nav-link">
                        <li role="link">Account.</li>
                    </router-link>
                    <router-link :to="{ name: 'PageLogin'}" class="nav-link">
                        <li role="link">Log in.</li>
                    </router-link>
                </div><!-- .nav-user-link -->
            </ul> <!-- .nav-items -->
            <ul v-else-if="curretPage === 'PageLogin'" v-bind:class="{ isVisible: isVisible }" class="nav-items">
                <router-link :to="{ name: 'PageHome'}" class="nav-link">
                    <li role="link">Home.</li>
                </router-link>
                <div class="nav-user-links">
                    <router-link :to="{ name: 'PageUser'}" class="nav-link">
                        <li role="link">Account.</li>
                    </router-link>
                    <router-link :to="{ name: 'PageSignup'}" class="nav-link">
                        <li role="link">Sign up.</li>
                    </router-link>
                </div><!-- .nav-user-link -->
            </ul> <!-- .nav-items -->
            <ul v-else-if="curretPage === 'PageNews'" v-bind:class="{ isVisible: isVisible }" class="nav-items">
                <router-link :to="{ name: 'PageHome'}" class="nav-link">
                    <li role="link">Home.</li>
                </router-link>
                <div class="nav-user-links">
                    <router-link :to="{ name: 'PageUser'}" class="nav-link">
                        <li role="link">Account.</li>
                    </router-link>
                    <li v-on:click="logout" class="nav-link">Log out.</li>
                </div> <!-- .nav-user-link -->
            </ul> <!-- .nav-items -->
            <ul v-else-if="curretPage === 'PageUser'" v-bind:class="{ isVisible: isVisible }" class="nav-items">
                <router-link :to="{ name: 'PageHome'}" class="nav-link">
                    <li role="link">Home.</li>
                </router-link>
                <router-link :to="{ name: 'PageNews'}" class="nav-link">
                    <li role="link">News.</li>
                </router-link>
                <div class="nav-user-links">
                    <li v-on:click="logout" class="nav-link">Log out.</li>
                </div> <!-- .nav-user-link -->
            </ul> <!-- .nav-items -->
            <ul v-else v-bind:class="{ isVisible: isVisible }" class="nav-items">
                <li v-scroll-to="'#how-its-made'" class="nav-link">Obiettivo.</li>
                <li v-scroll-to="'#our-story'" class="nav-link">About.</li>
                <router-link :to="{ name: 'PageNews'}" class="nav-link">
                    <li role="link">News.</li>
                </router-link>
                <div class="nav-user-links">
                    <router-link :to="{ name: 'PageUser'}" class="nav-link">
                        <li role="link">Account.</li>
                    </router-link>
                    <router-link :to="{ name: 'PageLogin'}" class="nav-link">
                        <li role="link">Log in.</li>
                    </router-link>
                    <router-link :to="{ name: 'PageSignup'}" class="nav-link btn-link">
                        <li role="link">Sign up.</li>
                    </router-link>
                </div> <!-- .nav-user-link -->
            </ul> <!-- .nav-items -->
            <img v-on:click="toggleMenu" class="nav-icon" src="../assets/menu-outline.svg" alt="nav-menu-icon">
        </div> <!-- .nav-container -->
    </div> <!-- .nav -->
</template>

<script>
export default {
    name: 'Nav',
    data() {
        return {
            curretPage: null,
            isVisible: true,
            isScrolled: false,
            isSmall: false
        }
    },
    watch: {
        $route() {
            this.curretPage = this.$route.name;
        }
    },
    methods: {
        toggleMenu: function() {
            this.isVisible ? this.isVisible = false : this.isVisible = true; 
        },
        onScroll: function() {
            const scrolling = window.scrollY;
            scrolling > 100 ? this.isScrolled = true : this.isScrolled = false;
        },
        onResize: function() {
            const resize = window.innerWidth;
            if (resize < 768) {
                this.isSmall = true;
                this.isVisible = false;
            } else {
                this.isSmall = false;
                this.isVisible = true;
            }
        },
        logout: function () {
            this.$store.dispatch('logout');
        }
    },
    created() {
        this.curretPage = this.$route.name;
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    }   
}
</script>

<style lang="scss" scoped>

$colorRed: #e16259;
$colorRedDark: #cf5951;

.nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background: #fff;
    &.isScrolled {
        .nav-container {
            border-bottom: solid 1px #f2f2f2;
            .nav-items {
                margin: .7em 0;
            }
        }
    }
    &.isSmall {
        .nav-container {
            min-height: 70px;
            display: flex;
            justify-content: center;
            text-align: center;
            border-bottom: solid 1px #f2f2f2;
            background: #fdfdfd;
            .nav-icon {
                display: block;
            }
            .nav-items {
                display: none;
                margin: .7em 0;
                .nav-link {
                    display: block;
                }
                .nav-user-links {
                    &::before {
                        display: none;
                    }
                }
            }
        }
    }
    .nav-container {
        width: 100%;
        max-width: 1200px;
        position: relative;
        margin: 0 auto;
        padding: 0 15px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .nav-icon {
            cursor: pointer;
            width: 32px;
            height: 32px;
            position: absolute;
            top: 10px;
            right: 25px;
            display: none;
            padding: .5em;
            box-sizing: content-box;
            color: #373737;
        }
        .nav-items {
            display: none;
            margin: 1.2em 0;
            transition: ease-in-out margin .5s;
            &.isVisible {
                display: block;
            }
            .nav-link {
                cursor: pointer;
                list-style: none;
                display: inline-block;
                padding: .6em .7em;
                border-radius: 4px;
                color: #222;
                font-size: .95em;
                font-weight: 500;
                text-decoration: none;
                &.btn-link {
                    &:hover {
                        background: $colorRed;
                        color: #fff;
                    }
                }
                &:last-child {    
                    color: $colorRed;
                }
                &:hover {
                    background: #f9f9f9;
                }
            }
            .nav-user-links {
                display: inline-block;
                &::before {
                    content: '';
                    height: 20px;
                    width: 1px;
                    position: relative;
                    top: 4.5px;
                    display: inline-block;
                    margin: 0 15px;
                    background: rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
}

</style>