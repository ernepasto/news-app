<template>
    <div id="PageNews">
        
        <div class="articles-container">
            <div v-bind:class="{ removed: showPage }" class="loading-view">
                <h1 class="loading-view-title">Wait just a second...</h1>
            </div> <!-- /.loading-view -->
            <h1 class="articles-title">Scegli, clicca <span>&</span> leggi</h1>
            <div class="articles-category">
                <p>Scegli una categoria di notizie:</p>
                <select v-model="category">
                    <option value="general">Generale</option>
                    <option value="business">Business</option>
                    <option value="entertainment">Intrattenimento</option>
                    <option value="health">Salute</option>
                    <option value="science">Scienza</option>
                    <option value="sports">Sport</option>
                    <option value="technology">Tecnologia</option>
                </select>
            </div> <!-- /.article-category -->
            <div class="articles-grid">
                <div v-for="article in news" :key="article.title" class="article">
                    <a v-bind:href="article.url" target="_blank">
                        <div class="article-preview-wrapper">
                            <div class="article-filer"></div>
                            <img v-bind:src="article.urlToImage" class="article-image" v-bind:alt="'article-image-'+ article.source.name">
                            <h4 class="article-title">{{ article.title }}</h4>
                        </div> <!-- /.post-preview-wrapper -->
                        <div class="article-info">
                            <span>{{ article.publishedAt | formatDate }}</span> - 
                            <span>{{ article.source.name }}</span>
                        </div> <!-- /.post-info -->
                    </a>
                </div> <!-- /.post -->
            </div> <!-- /.posts-grid -->
        </div> <!-- /.posts-container -->

    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'PageNews',
    data() {
        return {
            news: [],
            category: 'general',
            showPage: false
        }
    },
    filters: {
        formatDate(date) {
            return moment(String(date)).format('DD MMMM YYYY');
        }    
    },
    methods: {
        onLoad: function() {
            fetch('http://localhost:8083/api/news', {
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
                if (response.status !== 200) {
                    this.$toast.warning(response.data.message);
                    this.$router.replace({ name: 'PageLogin' });
                } else this.news = response.data;
            })
            .catch(error => {
                console.error(error);
                this.$toast.error('System error, try later');
            });
        },
        loadByCategory: function() {
            fetch(`http://localhost:8083/api/news/${this.category}`, {
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
                if (response.status === 200) this.news = response.data;
            })
            .catch(error => {
                console.error(error);
                this.$toast.error('System error, try later');
            });
        },
        clearPage: function() {
            setTimeout(() => {
                this.showPage = true;
            }, 500);
            clearInterval();
        }
    },
    watch: {
        category: function (selected) {
            this.category = selected;
            this.loadByCategory();
        },
    },
    async created() {
        await this.onLoad();
        this.$once(this.clearPage());
    }
}
</script>

<style lang="scss" scoped>
$colorRed: #e16259;

.articles-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 150px 15px;
    position: relative;
    .loading-view {
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        transition: ease-in-out all .1s;
        pointer-events: none;
        &.removed {
            opacity: 0;
        }
        .loading-view-title {
            position: relative;
            margin: 0 0 .5em 0;
            color: #222;
            font-size: 3em;
            font-weight: 800;
            @media screen and (max-width: 800px) {
                font-size: 2.7em;
            }
        }
    }
    .articles-title {
        margin: 0 0 .5em 0;
        color: #222;
        font-size: 3em;
        font-weight: 800;
        span {
            color: $colorRed;
        }
        @media screen and (max-width: 800px) {
            font-size: 2.7em;
        }
    }
    .articles-category {
        margin: 1em 0;
        p {
            margin: 0 0 .5em 0;
            color: #666;
            font-size: 1em;
        }
        select {
            cursor: pointer;
            padding: .8em;
            border: none;
            border-radius: 4px;
            outline: none;
            background: #f1f1f1;
            color: #222;
            font-family: 'Inter', sans-serif;
            font-size: .95em; 
            option {
                cursor: pointer;
                display: inline-block;
                padding: .8em;
                border: none;
                border-radius: 4px;
                outline: none;
                background: #fff;
                color: #666;
                font-family: 'Poppins', sans-serif;
                font-size: .9em;
            }
        }
    }
    .articles-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 20px;
        row-gap: 50px;
        @media screen and (max-width: 1000px) {
            grid-template-columns: 100%;
        }
        .article {
            width: 100%;
            cursor: pointer;
            justify-self: center;
            @media screen and (max-width: 1000px) {
                max-width: 70%;
            }
            @media screen and (max-width: 700px) {
                max-width: 100%;
            }
            a {
                text-decoration: none;
            }
            .article-preview-wrapper {
                max-height: 250px;
                width: 100%;
                position: relative;
                overflow: hidden;
                margin-bottom: 1em;
                border: solid 1px #f9f9f9;
                border-radius: 6px;
                background-size: cover;
                background-position: center center;
                box-shadow: 8px 8px 20px rgba($color: #000, $alpha: .005);
                .article-filer {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    background: linear-gradient(0deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 75%, rgba(0,0,0,0) 100%);
                }
                .article-image {
                    height: auto;
                    width: 100%;
                    display: block;
                }
                .article-title {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    z-index: 2;
                    padding: 25px;
                    color: #fff;
                    font-size: 1.3em;
                    font-weight: 500;
                }
            }
            .article-info {
                color: #999;
                font-size: .95em;
                span {
                    display: inline-block;
                    color: #999;
                    font-size: .95em;  
                    font-style: italic; 
                }
            }
        }
    }
}

</style>