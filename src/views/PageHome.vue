<template>
    <div id="PageHome">
        <div class="header">
            <div class="header-wrapper">
                <h1 class="header-title">
                    <span>Un nuovo modo</span>
                    <span>per essere informati</span>
                    <span><i>sul mondo</i>.</span>
                </h1>
                <p class="header-text">
                    Selezioniamo per te le notizie più popolari dalle maggiori
                    testate giornalistiche italiane, per offrirti un nuovo modo
                    per essere sempre aggiornati.
                </p>
                <router-link :to="{ name: 'PageNews'}" class="header-cta">
                    <div role="link">Leggi subito</div>
                </router-link>
                <img src="../assets/header-illustration.svg" alt="header-illustration">
            </div> <!-- /.header-wrapper -->
        </div> <!-- /.header -->

        <section class="how-its-made" id="how-its-made">
            <div class="section-container">
                <h2 class="section-title">Il nostro obiettivo</h2>
                <div class="row">
                    <div class="column">
                        <h3>Notizie affidabili</h3>
                        <p>
                            Le notizie riportate provengono dalle principali
                            testate giornalistiche italiane. La fonte è riportata accanto
                            alla data della pubblicazione dell'articlo stesso.
                        </p>
                    </div> <!-- /.column -->
                    <div class="column">
                        <h3>Top headlines</h3>  
                        <p>
                            Nella sezione "news" si ha la possibilità di leggere
                            le breaking news della giornata e di scegliere
                            una particolare categoria.
                        </p>  
                    </div> <!-- /.column -->
                    <div class="column">
                        <h3>Qualunque device</h3>    
                        <p>
                            Grazie al design responsivo l'applicazione è fruibile da
                            qualunque dispositvo, tramite qualsiasi browser web.
                            In questo modo potrai informarti in qualunque momento! 
                        </p>
                    </div> <!-- /.column -->
                </div> <!-- /.row -->
            </div> <!-- /.section-container -->
        </section> <!-- /.how-its-made -->

        <section class="our-story no-pd-tp" id="our-story">
            <div class="section-container">
                <div class="row">
                    <div class="column">
                        <img src="../assets/family-illustration.svg" alt="family-illustration">
                    </div> <!-- /.column -->
                    <div class="column">
                        <h2 class="section-title">Segui gli eventi</h2>
                        <p>
                            Crea subito il tuo account. 
                            Potrai usufruire di tutti i servizi offerti <span>gratuitamente</span> e
                            con la possibilità di eliminare tutti i dati quando vorrai.
                        </p>
                        <p>
                            Hai a tua disposizione notizie appartenenti a diverse categorie: <span>generale, buisness, 
                            intrattenimento, salute, scienza, sport e tecnologia. </span>
                        </p>
                        <router-link :to="{ name: 'PageSignup'}" class="section-btn">
                            <div role="link">Sign up</div>
                        </router-link>
                    </div> <!-- /.column -->
                </div> <!-- /.row -->
            </div> <!-- /.section-container -->
        </section> <!-- /.our-story -->

    </div>
</template>

<script>
export default {
    name: 'PageHome'
}
</script>

<style lang="scss" scoped>

$colorRed: #e16259;
$colorRedDark: #cf5951;

.header {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(10.36deg,rgba(236,238,243,.52) -7.82%,rgba(248,248,249,0) 70.43%);
    .header-wrapper {
        height: 100%;
        width: 100%;
        max-width: 1200px;
        position: relative;
        margin: 0 auto;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .header-title {
            margin: 0 0 .25em 0;
            color: #222;
            font-size: 3.5em;
            font-weight: 800;
            line-height: 115%;
            span {
                display: block;
            }
            i {
                font-style: normal;
                color: $colorRed;
            }
        }
        .header-text {
            width: 100%;
            max-width: 475px;
            margin: 0 0 1em 0;
            color: #666;
            font-size: 1.1em;
            line-height: 155%;
        }
        .header-cta {
            cursor: pointer;
            display: inline-block;
            padding: .9em 1.8em;
            border-radius: 4px;
            background: $colorRed;
            color: #fff;
            font-size: .9em;
            text-decoration: none;
            &:hover {
                background: $colorRedDark;
            }
        }
        img {
            height: auto;
            width: 800px;
            position: absolute;
            right: -50px;
            display: inline-block;
            @media screen and (max-width: 1150px) {
                display: none;
            }
        }
        @media screen and (max-width: 800px) {
            .header-title {
                width: 100%;
                max-width: 475px;
                font-size: 3.5em;
                span {
                    display: inline;
                }
            }
        }
    }
}

section {
    padding: 150px 0;
    &.no-pd-tp {
        padding: 0 0 100px 0;
    }
    .section-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
        .section-title {
            margin: 0 0 1.5em 0;
            color: #222;
            font-size: 3em;
            font-weight: 800;
            &::after {
                content: '';
                height: 1px;
                width: 100%;
                display: block;
                margin-top: 7px;
                background: #f2f2f2;
            }
        }
        .section-btn {
            cursor: pointer;
            display: inline-block;
            padding: .9em 1.8em;
            border-radius: 4px;
            background: $colorRed;
            color: #fff;
            font-size: .9em;
            text-decoration: none;
            &:hover {
                background: $colorRedDark;
            }
        }
    }
}

.how-its-made {
    text-align: center;
    @media screen and (max-width: 1000px) {
        text-align: left;
    }
    .row {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 50px;
        @media screen and (max-width: 1000px) {
            grid-template-columns: repeat(4, 1fr);
            .column {
                grid-column: 3/5;
                grid-row: 1;
                &:first-child {
                    grid-column: 1/3;
                    grid-row: 1;
                }
                &:last-child {
                    grid-column: 2/4;
                    grid-row: 2;
                }
            }
        }
        @media screen and (max-width: 600px) {
            grid-template-columns: 100%;
            grid-template-rows: auto auto auto;
            .column {
                grid-column: 1;
                grid-row: 1;
                &:first-child {
                    grid-column: 1;
                    grid-row: 2;
                }
                &:last-child {
                    grid-column: 1;
                    grid-row: 3;
                }
            }
        }
        .column {
            flex: 1;
            h3 {
                position: relative;
                display: inline-block;
                margin: 0 0 .35em 0;
                color: #222;
                font-size: 2em;
                &::after {
                    content: '';
                    height: 8px;
                    width: 100%;
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                    z-index: -1;
                    background: $colorRed;
                    opacity: .6;
                }
            }
            p {
                color: #666;
                line-height: 150%;
            }
        }
    }
}

.our-story {
    .row {
        width: 100%;
        display: grid;
        grid-template-columns: 52.5% 42.5%;
        column-gap: 5%;
        .column {
            align-self: center;
            img {
                height: auto;
                width: 100%;
                display: inline-block;
            }
            h2 {
                margin: 0 0 .5em 0;
            }
            p {
                margin: 0 0 1em 0;
                color: #666;
                line-height: 150%;
                span {
                    font-weight: 700;
                }
            }
        }
        @media screen and (max-width: 900px) {
            grid-template-columns: 100%;
        }
    }
}

</style>